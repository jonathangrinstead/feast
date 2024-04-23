module RecipesHelper
  def current_user_likes_recipe?(recipe)
    user_signed_in? && current_user.likes.exists?(recipe: recipe)
  end

  def find_user_like_id(user, recipe)
    like = user.likes.find_by(recipe: recipe)
    like&.id # Returns the id of the like if it exists, or nil if it doesn't
  end
end
