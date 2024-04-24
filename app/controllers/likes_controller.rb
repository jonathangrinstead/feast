class LikesController < ApplicationController
  before_action :find_recipe
  before_action :authenticate_user!

  def create
    @recipe.likes.create(user: current_user) unless already_liked?
  end

  def destroy
    @recipe.likes.where(user: current_user).destroy_all if already_liked?
  end

  private

  def find_recipe
    @recipe = Recipe.find(params[:recipe_id])
  end

  def already_liked?
    Like.where(user: current_user, recipe: @recipe).exists?
  end
end
