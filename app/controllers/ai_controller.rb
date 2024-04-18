class AiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  require 'httparty'
  require 'json'

  def create
    ingredients = params[:ingredients].values.join(", ")
    generate_recipe_ideas(ingredients)
    if @error
      render json: { error: @error }, status: :unprocessable_entity
    else
      render json: { content: @recipe_content, image_url: @image_url }
    end
  end

  private

  def generate_recipe_ideas(ingredients)
    api_key = ENV['CHAT_GPT_API_KEY']
    prompt = "Create a recipe with the following ingredients: #{ingredients}. Please provide a detailed recipe. " +
             "Format the response as follows: 'Title: [Recipe Title] // Ingredients: [List] // Instructions: [Detailed Steps]'. " +
              "Use double slashes '//' as section separators."
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
    recipe_content = parsed_response['choices'][0]['message']['content'] rescue "Content not found"

    title_regex = /Title:\s*(.*?)\s*\/\/\s*Ingredients:/
    match = recipe_content.match(title_regex)

    if match
      @title = match[1].strip
      @image_url = fetch_images_from_unsplash(@title)
      @recipe_content = recipe_content
    else
      @error = "Recipe format incorrect or title not found."
    end
  end

  def fetch_images_from_unsplash(query)
    access_key = ENV['UNSPLASH_API_KEY']
    url = "https://api.unsplash.com/search/photos?page=1&query=#{query}&client_id=#{access_key}"
    response = HTTParty.get(url)
    if response.ok?
      images = JSON.parse(response.body)['results']
      images.empty? ? nil : images.first['urls']['regular']
    else
      puts "Failed to fetch images: #{response.message}"
      nil
    end
  end
end
