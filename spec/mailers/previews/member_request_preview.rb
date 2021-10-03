# Preview all emails at http://localhost:3000/rails/mailers/member_request
class MemberRequestPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/member_request/request_created
  def request_created
    MemberRequestMailer.request_created
  end

end
