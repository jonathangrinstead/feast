class AiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    # Assuming you receive ingredients as an array of names
    ingredients = params[:ingredients].values
    recipe_ideas = generate_recipe_ideas(ingredients)

    render json: { recipes: recipe_ideas }
  end

  private

  def generate_recipe_ideas(ingredients)
    # Placeholder for generating recipe ideas based on ingredients
    # For example, it could call an external API to generate ideas
    # Here we simulate generating ideas based on provided ingredients
    recipes = ingredients.map { |ingredient| "Recipe with #{ingredient}" }
    recipes << "Mix of all ingredients: #{ingredients.join(', ')}"
    recipes
  end
end
