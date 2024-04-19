class DashboardController < ApplicationController
  def home
    @recipe = Recipe.new
    @recipes = Recipe.shared
  end
end
