class CommentsController < ApplicationController
    before_action :authenticate_user!
    before_action :find_recipe

    def new
        @comment = @recipe.comments.build
    end
    
    def create
        @comment = @recipe.comments.build(comment_params)
        @comment.user = current_user 
    
        if @comment.save
          redirect_back(fallback_location: root_path, notice: 'Comment was successfully added.')
        else
          render :new
        end
    end

    private 

    def find_recipe
        @recipe = Recipe.find(params[:recipe_id])
    end

    def comment_params
        params.require(:comment).permit(:text)
    end
end
