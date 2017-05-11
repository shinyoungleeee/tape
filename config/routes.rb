Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'

  get 'albums', to: 'static_pages#index'
  get 'users/:user_id/albums', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :albums
      resources :users do
        get '/albums', to: 'users#albums'
      end
      post '/search/albums', to: 'search#albums'
      post '/search/streams', to: 'search#streams'
      get '/search/test', to: 'search#test'
    end
  end
end
