# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#show'

  resources :attendances
  resources :events

  devise_for :members, controllers: { omniauth_callbacks: 'members/omniauth_callbacks' }
  devise_scope :member do
    get 'members/sign_in', to: 'members/sessions#new', as: :new_member_session
    get 'members/sign_out', to: 'members/sessions#destroy', as: :destroy_member_session
  end

  resources :members do
    member do
      get :delete
    end
  end

  namespace :api do
    namespace :v1 do
      resources :members, only: %i[index update show delete destroy]
    end
  end
end
