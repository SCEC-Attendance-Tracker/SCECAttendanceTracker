class HelpController < ApplicationController
    def index
      puts session[:member_id]
      @member = Member.find(session[:member_id])
    end
end
