class HomeController < ApplicationController
    skip_before_action :authenticate_member!, :only => [:show]
    def show
    end
end