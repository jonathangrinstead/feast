class ChatroomsController < ApplicationController
    before_action :authenticate_user!
    
    def index
        
    end 

    def show
        @chatroom = Chatroom.find(params[:id])
      end

    def new
        @mutuals = current_user.followers & current_user.following
    end 

    def create
        @chatroom = Chatroom.new
        @chatroom.users << current_user
        @chatroom.users << User.find(params[:mutual_id])
        if @chatroom.save
            redirect_to chatroom_path(@chatroom)
        else
            render 'new'
        end
    end
end
