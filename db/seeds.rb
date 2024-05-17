# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'faker'
require 'open-uri'



20.times do
    user = User.create!(
        username: Faker::Internet.unique.username,
        email: Faker::Internet.unique.email,
        password: Faker::Internet.password(min_length: 8)
    )

    # Attach an image to the user
    file = URI.open('https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg')
    user.photo.attach(io: file, filename: 'profilepic.jpg', content_type: 'image/jpg')
  end
  
  puts '20 users created'
  
  # After creating users
  
  # Randomly create follow relationships between users
  User.all.each do |user|
    # Select a random number of users to follow
    rand(1..10).times do
      begin
        # Select a random user to follow
        followee = User.all.sample
        # Ensure the user is not trying to follow themselves
        next if user == followee
        # Create the follow relationship
        Follow.create!(follower: user, followed: followee)
      rescue ActiveRecord::RecordNotUnique
        # This will rescue the error if the follow relationship already exists
        retry
      end
    end
  end
  
  puts 'Follow relationships created'

recipe_image_urls= [
    "https://www.simplyrecipes.com/thmb/zSvZNZj70cA9uzOgV3oZEV5dvrQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Baklava-LEAD-4-a9d125c8d66547ef9f92c6564a5d5241.jpg",
    "https://www.southernliving.com/thmb/HSEUOjJVCl4kIRJRMAZ1eblQlWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*", 
    "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505", 
    "https://www.simplyrecipes.com/thmb/KRw_r32s4gQeOX-d07NWY1OlOFk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg",
    "https://www.eatingwell.com/thmb/Kx41aHMgb9iAY41IM5eSrQi-3O8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chickpea-curry-chhole-1x1-41ea4d53c7df4fddabd83caa5b57718e.jpg",
    "https://realfood.tesco.com/media/images/1400x919-HuntersChicken-1cddb648-ead8-4325-8e60-f80d1ca4ede3-0-1400x919.jpg"
]

20.times do
    recipe = Recipe.create!(
      name: Faker::Food.dish,
      description: Faker::Food.description,
      user: User.all.sample,
      is_shareable: true
    )
  
    # Attach an image to the recipe
    file = URI.open(recipe_image_urls.sample)
    recipe.photo.attach(io: file, filename: 'recipe.jpg', content_type: 'image/jpg')

        
    rand(1..5).times do
        Ingredient.create!(
        recipe: recipe,
        name: Faker::Food.ingredient,
        quantity: "#{rand(1..5)} #{Faker::Food.measurement}"
        )
    end

    rand(1..5).times do |i|
        Instruction.create!(
          recipe: recipe,
          step_number: i + 1,
          description: Faker::Lorem.sentence(word_count: 5)
        )
      end

      rand(1..5).times do
        Like.create!(
          user: User.all.sample,
          recipe: recipe
        )
      end

      rand(1..5).times do
        Bookmark.create!(
          user: User.all.sample,
          recipe: recipe
        )
      end

      rand(1..5).times do
        Comment.create!(
          user: User.all.sample,
          recipe: recipe,
          text: Faker::Lorem.sentence(word_count: 10)
        )
      end

  end

  puts '20 recipes created'
