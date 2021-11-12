# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'scecattendancetracker@gmail.com'
  layout 'mailer'
end
