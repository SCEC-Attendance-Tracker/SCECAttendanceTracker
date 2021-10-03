class MemberRequestMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.member_request_mailer.member_request.subject
  #
  def member_request
    @member = params[:member]
    @admins = Member.where(:admin => true)

    mail(to: @admins.pluck(:email), subject: 'SCEC - New Member Request')
  end
end
 