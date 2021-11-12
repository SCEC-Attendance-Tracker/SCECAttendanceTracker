# frozen_string_literal: true

class HomeController < ApplicationController
  def show
    puts session[:member_id]
    @member = Member.find(session[:member_id])
  end
end
