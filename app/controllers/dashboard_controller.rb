class DashboardController < ApplicationController
  def home
    @recipe = Recipe.new
    @recipes = Recipe.shared.most_recent
    @user_recipes = current_user.recipes
    @bookmarked_recipes = current_user.bookmarks.map(&:recipe)
  end
end
