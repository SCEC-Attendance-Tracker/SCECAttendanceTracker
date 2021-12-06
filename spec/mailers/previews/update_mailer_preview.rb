# Preview all emails at http://localhost:3000/rails/mailers/update_mailer
class UpdateMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/update_mailer/member_update_mailer
  def member_update_mailer
    UpdateMailer.member_update_mailer
  end

end
