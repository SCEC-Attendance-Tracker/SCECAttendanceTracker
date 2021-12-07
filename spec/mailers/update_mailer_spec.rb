# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UpdateMailer, type: :mailer do
  describe 'member_update_mailer' do
    let(:mem) {Member.create(admin: 'False', first_name: 'John', last_name: 'Doe', email: 'johndoe123@gmail.com')}
    let(:mail) { MemberRequestMailer.with(member: mem).member_request }

    it 'renders the headers' do
      expect(mail.subject).to eq('SCEC Account Updated')
      expect(mail.to).to eq(['johndoe123@gmail.com'])
      expect(mail.from).to eq(['scecattendancetracker@gmail.com'])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Your membership status has been updated by the SCEC admins.')
    end
  end 
end