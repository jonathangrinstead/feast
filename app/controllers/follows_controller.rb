class FollowsController < ApplicationController
    before_action :authenticate_user!

    def toggle
        @user = User.find(params[:id])
        if current_user.following?(@user)
          current_user.following.delete(@user)
        else
          current_user.following << @user
        end
    
        respond_to do |format|
            format.json { render json: { following: current_user.following?(@user), 
                followers_count: @user.followers.count, following_count: @user.following.count} }
          end
    end
end
