require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'home#index'
end
