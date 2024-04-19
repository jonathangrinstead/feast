class DashboardController < ApplicationController
  def home
    @recipe = Recipe.new
    @recipes = Recipe.shared.most_recent
  end
end
