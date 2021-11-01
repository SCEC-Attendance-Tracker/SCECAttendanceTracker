# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MemberRequestMailer, type: :mailer do
  describe 'request_created' do
    let(:mem) {Member.create(admin: 'False', first_name: 'John', last_name: 'Doe', email: 'johndoe123@gmail.com')}
    let(:mail) { MemberRequestMailer.with(member: mem).member_request }

    it 'renders the headers' do
      expect(mail.subject).to eq('SCEC Account Created')
      expect(mail.to).to eq(['johndoe123@gmail.com'])
      expect(mail.from).to eq(['scecattendancetracker@gmail.com'])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Welcome to the SCEC Attendance Tracker')
    end
  end
end
