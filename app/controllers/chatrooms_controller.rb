class ChatroomsController < ApplicationController
    def index
        
    end 

    def new
        @mutuals = current_user.followers & current_user.following
    end 
end
