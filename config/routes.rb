require 'sidekiq/web'

# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
#
Rails.application.routes.draw do

  resources :users, only: [:show, :index] do
    collection do
      get :csv_import_modal
      post :import_from_csv
    end
  end

  devise_for :users
  get '/pandas', to: 'pandas#index'

  root to: 'home#index'
end
