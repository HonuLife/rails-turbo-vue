require 'sidekiq/web'

Rails.application.routes.draw do
  get '/users', to: 'users#index'
  get '/users/csv_import_modal', to: 'users#csv_import_modal'
  post '/users/import_from_csv', to: 'users#import_from_csv'

  devise_for :users
  get '/pandas', to: 'pandas#index'

  root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
