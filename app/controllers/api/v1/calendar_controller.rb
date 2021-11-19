require 'google/api_client/client_secrets.rb'
require 'google/apis/calendar_v3'
require 'googleauth'

module Api
    module V1
        $subscribed = nil
        class CalendarController < ApplicationController
            def is_subscribed 
                service = Google::Apis::CalendarV3::CalendarService.new
                service.authorization = google_secret.to_authorization

                calendar_id = 'scecattendancetracker@gmail.com'
                begin 
                    response = service.get_calendar_list(calendar_id)
                rescue Google::Apis::ClientError 
                    $subscribed = false
                rescue Google::Apis::AuthorizationError
                    sign_out_all_scopes
                else
                    $subscribed = true
                end
                render json: {is_subscribed: $subscribed}
            end

            def subscribe
                service = Google::Apis::CalendarV3::CalendarService.new
                service.authorization = google_secret.to_authorization
                calendar_id = 'scecattendancetracker@gmail.com'

                if $subscribed 
                    begin
                        response = service.delete_calendar_list(calendar_id)
                    rescue Google::Apis::AuthorizationError
                        sign_out_all_scopes
                    end
                    puts response
                else
                    calendar = Google::Apis::CalendarV3::CalendarListEntry.new
                    calendar.id = calendar_id
                    begin
                        response = service.insert_calendar_list(calendar)
                    rescue Google::Apis::AuthorizationError
                        sign_out_all_scopes
                    end
                    puts response
                end
                $subscribed = !$subscribed
                render json: {is_subscribed: $subscribed}
            end

            def google_secret
                scope = 'https://www.googleapis.com/auth/calendar.calendarlist'
                Google::APIClient::ClientSecrets.new ({
                    'web' => {
                        'access_token' => session[:g_credentials]['token'],
                        'client_id' => ENV['GOOGLE_OAUTH_CLIENT_ID'],
                        'client_secret' => ENV['GOOGLE_OAUTH_CLIENT_SECRET'],
                        'scope' => scope
                    }
                }) 
            end
        end
    end
end
