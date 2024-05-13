class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.includes(:ingredients, :instructions).find(params[:id])
  end

  def new
    @user = current_user
    @recipe = Recipe.new
    @recipe.ingredients.build
    @recipe.instructions.build
    render 'new'
  end

  def edit
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user = current_user
    if @recipe.save
      redirect_to recipe_path(@recipe), notice: 'Recipe was successfully created.'
    else
      render :new
    end
  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe, notice: 'Recipe was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @recipe.destroy
    redirect_to recipes_url, notice: 'Recipe was successfully destroyed.'
  end

  def search
    @recipes = Recipe.where('name ILIKE ?', "%#{params[:query]}%")
    render partial: 'recipes', locals: { recipes: @recipes }
  end

  private

    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def recipe_params
      params.require(:recipe).permit(:name, :photo, :description, :is_shareable, :user_id, ingredients_attributes: [:id, :name, :quantity, :_destroy], instructions_attributes: [:id, :step_number, :description, :_destroy])
    end
end
