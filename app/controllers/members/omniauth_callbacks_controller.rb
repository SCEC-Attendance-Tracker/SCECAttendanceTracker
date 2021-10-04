class Members::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
      google_params = from_google_params

      puts google_params
      if defined?(google_params)
        sign_out_all_scopes
        flash[:success] = t 'devise.omniauth_callbacks.success', kind: 'Google'
        redirect_to new_member_path(google_params)
      else
        flash[:alert] = t 'devise.omniauth_callbacks.failure', kind: 'Google', reason: "#{auth.info.email} is not authorized."
        redirect_to new_member_session_path
      end
    end

    protected

    def after_omniauth_failure_path_for(_scope)
      new_member_session_path
    end

    def after_sign_in_path_for(resource_or_scope)
      stored_location_for(resource_or_scope) || new_member_path
    end

    private

    def from_google_params
      @from_google_params ||= {
        email: auth.info.email,
        first_name: auth.info.name.split[0],
        last_name: auth.info.name.split[1],
        uid: auth.uid
      }
    end

    def auth
      @auth ||= request.env['omniauth.auth']
    end
  end
