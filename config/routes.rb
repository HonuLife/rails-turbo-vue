require 'sidekiq/web'

Rails.application.routes.draw do
  resources :animals do
    collection do
      get :pandas, to: 'animals/pandas#index'
    end
  end

  root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
