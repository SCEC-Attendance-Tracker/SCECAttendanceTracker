# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/member_request
class MemberRequestPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/member_request/member_request
  def member_request
    MemberRequestMailer.with(member: Member.first).member_request.deliver_later
  end
end
