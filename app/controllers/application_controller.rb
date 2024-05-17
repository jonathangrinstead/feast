class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :fetch_notifications

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :photo])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :photo])
  end

  def fetch_notifications
    @notifications = current_user.notifications.order(created_at: :desc).includes(event: :record)
  end

end
