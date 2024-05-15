Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "pages#home"
  get "dashboard/home", to: 'dashboard#home', as: 'home'
  get "profile/:username", to: 'profile#show', as: :profile
  get "recipes/shared", to: 'recipes#shared'
  get "recipes/search", to: 'recipes#search'
  post "ai/create", to: 'ai#create'
  resources :recipes do
    resources :ingredients, only: [:create, :update, :destroy], shallow: true
    resources :instructions, only: [:create, :update, :destroy], shallow: true
    resources :likes, only: [:create, :destroy]
    resources :bookmarks, only: [:create, :destroy]
    resources :comments, only: [:new, :create]
  end

  resources :users, only: [:show] do
    member do
      post 'toggle_follow', to: 'follows#toggle'
    end
  end
end
