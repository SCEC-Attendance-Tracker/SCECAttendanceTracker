module Api
  module V1
    class EventsController < ApplicationController
        respond_to :json

        def index 
            @events = Event.all 
            render json: @events
        end 

        def create 
            @event = Event.new(event_params)

            code = create_code
            @event.code = code

            if @event.save
                render json: @event 
            else 
                puts @event.errors.full_messages
                render json: @event.errors 
            end
        end
        
        def destroy
          @event = Event.find(params[:id])
          @event.destroy
          render json: { notice: 'Event deleted' }
        end

        private 

        def create_code
            code = ''
            i = 0
                while i < 4 do
                    char = rand(97..122)
                    if rand(0..1).zero?
                    char = char - 32
                    end 
                    code = code + char.chr
                    i += 1
                end 
            return code
        end

        def event_params
            params.require(:event).permit(:title, :start_date, :end_date, :description, :location)
        end 

        def set_event
            @event = Event.find(params[:id])
        end
    end 
  end
end 
