class NotificationsController < ApplicationController
    def index
        if user_signed_in?
            @notifications = current_user.notifications.includes(event: :record).order(created_at: :desc)
        end
    end
end
