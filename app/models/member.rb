# frozen_string_literal: true

class Member < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:google_oauth2]

  def self.from_google(email:, first_name:, last_name:, img_url:)
      create_with(email: email, first_name: first_name, last_name: last_name, 
        paid_dues: false, total_attendance: 0, img_url: img_url,
        admin: false, member:false).find_or_create_by!(email: email)
  end

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :img_url, presence: true
end
