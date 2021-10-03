Rails.application.routes.draw do
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

  root 'members#index'
end
