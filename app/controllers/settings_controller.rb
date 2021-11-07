class SettingsController < ApplicationController
    def show
        puts session[:member_id]
        @member = Member.find(session[:member_id])

        if @member.admin == false 
            redirect_to(root_path)
        end 

        if @member.admin == nil 
            redirect_to(root_path)
        end 
    end
end