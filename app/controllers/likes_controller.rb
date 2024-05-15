class LikesController < ApplicationController
  before_action :find_recipe
  before_action :authenticate_user!

  def create
    if already_liked?
      render json: { success: false }
    else
      @recipe.likes.create(user_id: current_user.id)
      respond_to do |format|
        format.json { render json: { success: true, newCount: @recipe.likes.count } }
      end
    end
  end

  def destroy
    if !(already_liked?)
      render json: { success: false }
    else
      Like.where(recipe_id: params[:recipe_id], user_id: current_user.id).first.destroy
      respond_to do |format|
        format.json { render json: { success: true, newCount: @recipe.likes.count } }
      end
    end
  end

  private

  def find_recipe
    @recipe = Recipe.find(params[:recipe_id])
  end

  def already_liked?
    Like.where(user: current_user, recipe: @recipe).exists?
  end
end