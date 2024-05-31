require 'httparty'
require 'openai'


class OpenAiService
  include HTTParty


  def initialize(ingredients)
    @ingredients = ingredients
    @api_key = ENV['CHAT_GPT']
  end

  def generate_recipe
    client = OpenAI::Client.new(access_token: @api_key)
    response = client.chat(
      parameters: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Create a recipe for these #{@ingredients}"}],
          temperature: 0.7,
      })
  response.dig("choices", 0, "message", "content")
  end
end
