Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'

  resources :albums

  namespace :api do
    namespace :v1 do
      resources :albums
      resource :users, only: [:show]
      post '/search/albums', to: 'search#albums'
      post '/search/streams', to: 'search#streams'
    end
  end
end
