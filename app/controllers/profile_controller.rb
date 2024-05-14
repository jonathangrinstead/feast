class ProfileController < ApplicationController
    def show
        @user = User.find_by(username: params[:id])
    end
end
