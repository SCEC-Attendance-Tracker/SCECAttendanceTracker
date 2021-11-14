# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MemberRequestMailer, type: :mailer do
  describe 'request_created' do
    let(:mail) { MemberRequestMailer.with(member: Member.first).member_request.deliver_later }

    xit 'renders the headers' do
      expect(mail.subject).to eq('MemberRequest')
      expect(mail.to).to eq(['to@example.org'])
      expect(mail.from).to eq(['scecattendancetracker@gmail.com'])
    end

    xit 'renders the body' do
      expect(mail.body.encoded).to match('Welcome to the SCEC Attendance Tracker')
    end
  end
end
