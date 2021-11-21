class Members::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
      google_params = from_google_params

      check_member = Member.find_by(email: google_params[:email])
      if(check_member)
        sign_in check_member, event: :authentication
        if(!defined?(check_member.img_url) & auth.info.image != check_member.img_url)
          check_member.update({img_url: auth.info.image})
        end 
        #save session variables: id, member & admin
        session[:member_id] = check_member.id
        session[:member] = check_member.is_member
        session[:admin] = check_member.admin

        session[:g_credentials] = request.env['omniauth.auth'].credentials
        redirect_to root_path
      elsif defined?(google_params)
        sign_out_all_scopes
        flash[:success] = t 'devise.omniauth_callbacks.success', kind: 'Google'

        member = Member.from_google(**google_params)

        sign_in member, event: :authentication

        #save session variables: id, member & admin
        session[:member_id] = member.id
        session[:member] = member.is_member
        session[:admin] = member.admin

        session[:g_credentials] = request.env['omniauth.auth'].credentials
        redirect_to new_member_path({email: google_params[:email]})
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
        img_url: auth.info.image
      }
    end
    def auth
      @auth ||= request.env['omniauth.auth']
    end
  end
