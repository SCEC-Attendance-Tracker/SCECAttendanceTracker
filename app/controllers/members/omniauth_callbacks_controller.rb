class Members::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
      google_params = from_google_params

      check_member = Member.find_by(email: google_params[:email])
      if(check_member) 
        sign_in check_member, event: :authentication
        redirect_to root_path
      elsif defined?(google_params)
        sign_out_all_scopes
        flash[:success] = t 'devise.omniauth_callbacks.success', kind: 'Google'

        member = Member.from_google(**google_params)

        sign_in member, event: :authentication
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
        last_name: auth.info.name.split[1]
      }
    end
    def auth
      @auth ||= request.env['omniauth.auth']
    end
  end
