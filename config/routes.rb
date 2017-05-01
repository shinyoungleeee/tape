Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'

  resources :albums

  namespace :api do
    namespace :v1 do
      resources :albums
    end
  end
end
