# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users
  resources :patients
  get 'patients/search/:q', to: 'patients#search', format: :json
  get 'patients/filter/:filter', to: 'patients#filter', format: :json
end
