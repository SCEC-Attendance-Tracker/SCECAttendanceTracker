Rails.application.routes.draw do
  root to: 'home#show'
  devise_for :members, controllers: { omniauth_callbacks: 'members/omniauth_callbacks' }
  devise_scope :member do
    get 'members/sign_in', to: 'members/sessions#new', as: :new_member_session
    get 'members/sign_out', to: 'members/sessions#destroy', as: :destroy_member_session
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :members do
    member do
      get :delete
    end
  end

  namespace :api do
    namespace :v1 do
      get 'members/index', to: 'members#index'
      post 'members/create', to: 'members#create'
      delete 'members/:id', to: 'members#destroy'
    end
  end
end
