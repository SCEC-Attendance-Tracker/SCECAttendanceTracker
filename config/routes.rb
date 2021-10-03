Rails.application.routes.draw do
  root to: 'home#show'

  resources :attendances
  resources :events

  devise_for :members, controllers: { omniauth_callbacks: 'members/omniauth_callbacks' }
  devise_scope :member do
    get 'members/sign_in', to: 'members/sessions#new', as: :new_member_session
    get 'members/sign_out', to: 'members/sessions#destroy', as: :destroy_member_session
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
