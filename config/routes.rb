# frozen_string_literal: true

# Set both to false if you need to debug and can't access a route
class AdminConstraint
  def initialize
  end

  def self.matches? (request)
    Member.find(request.session[:member_id]).admin == true
  end 
end 

class MemberConstraint
  def initialize
  end

  def self.matches? (request) 
    Member.find(request.session[:member_id]).is_member == true
  end
end

Rails.application.routes.draw do
  resources :links
  resources :help

  root to: 'home#show'

  devise_for :members, controllers: { omniauth_callbacks: 'members/omniauth_callbacks' }
  devise_scope :member do
    get 'members/sign_in', to: 'members/sessions#new', as: :new_member_session
    get 'members/sign_out', to: 'members/sessions#destroy', as: :destroy_member_session
  end

  constraints(AdminConstraint) do
    resources :feedbacks 
    resources :members
    resources :attendances
    namespace :api do
      namespace :v1 do
        resources :members, only: %i[index]
        resources :events, only: %i[update delete destroy]
        resources :attendances, only: %i[index delete destroy]
        resources :feedbacks, only: %i[index]
        get 'members/index'
        get 'events/index'
        get 'attendances/index'
        resources :links, only: %i[update delete destroy create]     
      end
    end
  end

  constraints(MemberConstraint) do 
    resources :events do
      resources :feedbacks 
    end

    namespace :api do 
      namespace :v1 do 
        resources :members, only: %i[show update delete destroy]
        resources :events, only: %i[index show]
        resources :feedbacks, only: %i[create show]
        resources :attendances, only: %i[index show update create]
        resources :calendar, only: %i[] do
          collection do
            get :is_subscribed
            put :subscribe
          end
        end 
      end
    end
  end
end
