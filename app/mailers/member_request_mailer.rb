# frozen_string_literal: true

class MemberRequestMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.member_request_mailer.member_request.subject
  #
  def member_request
    @member = params[:member]

    mail(to: @member.email, subject: 'SCEC Account Created')
  end
end
