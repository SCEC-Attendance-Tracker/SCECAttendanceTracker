class ApplicationController < ActionController::Base
    before_action :authenticate_member!
end
