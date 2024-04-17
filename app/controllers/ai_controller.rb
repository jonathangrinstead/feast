class AiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  require 'httparty'
  require 'json'

  def create
    ingredients = params[:ingredients].values.join(", ")
    recipes = generate_recipe_ideas(ingredients)
    render json: { recipes: recipes }
  end

  private

  def generate_recipe_ideas(ingredients)
    api_key = ENV['CHAT_GPT_API_KEY']
    prompt = "Create a recipe with the following ingredients: #{ingredients}. Please provide a detailed recipe."
    headers = {
      "Authorization" => "Bearer #{api_key}",
      "Content-Type" => "application/json"
    }
    body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    }.to_json
    url = "https://api.openai.com/v1/chat/completions"
    response = HTTParty.post(url, headers: headers, body: body)
    parsed_response = JSON.parse(response.body)
    parsed_response['choices'][0]['message']['content'] rescue "Content not found"
  end
end
