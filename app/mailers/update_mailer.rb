class UpdateMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.update_mailer.member_update_mailer.subject
  #
  def member_update_mailer
    @member = params[:member]

    mail(to: @member.email, subject: 'SCEC Account Updated')
  end
end 
