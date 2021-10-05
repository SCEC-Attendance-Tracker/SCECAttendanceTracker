class Member < ApplicationRecord
    devise :omniauthable, omniauth_providers: [:google_oauth2]

    def self.from_google(email:, first_name:, last_name:)
        create_with(email: email, first_name: first_name, last_name: last_name, total_attendance: 0).find_or_create_by!(email: email)
    end
end