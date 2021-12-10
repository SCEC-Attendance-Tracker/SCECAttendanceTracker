class PrivacypolicyController < ApplicationController
  skip_before_action :authenticate_member!, only: [:index]
  def index
    puts session[:member_id]
    @member = Member.find(session[:member_id])
  end
end
