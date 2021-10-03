class Member < ApplicationRecord
    devise :omniauthable, omniauth_providers: [:google_oauth2]

    def self.from_google(email:, first_name:, last_name:)
        if new_member = Member.find_by_email(email)
            create_with(email: email, first_name: first_name, last_name: last_name).find_or_create_by!(email: email)
          else
            create_with(email: email, first_name: first_name, last_name: last_name).find_or_create_by!(email: email)
            member = Member.find_by_email(email)
            MemberRequestMailer.with(member: member).member_request.deliver_now
            create_with(email: email, first_name: first_name, last_name: last_name).find_or_create_by!(email: email)
        end
    end
end
