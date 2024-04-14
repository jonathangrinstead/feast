class DashboardController < ApplicationController
  def home
    @recipe = Recipe.shared
  end
end
