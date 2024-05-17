# To deliver this notification:
 #RecipeNotifier.with(record: @recipe).deliver(@recipe.user.followers)
class RecipeNotifier < ApplicationNotifier
  # Add your delivery methods
  # deliver_by :email do |config|
  #   config.mailer = "UserMailer"
  #   config.method = "new_post"
  # end
  #
  # bulk_deliver_by :slack do |config|
  #   config.url = -> { Rails.application.credentials.slack_webhook_url }
  # end
  #
  # deliver_by :custom do |config|
  #   config.class = "MyDeliveryMethod"
  # end
  
  notification_methods do 
    def message 
      "@#{record.user.username} has a new recipe: #{record.name}" 
    end
  end
  # required_param :message
end
