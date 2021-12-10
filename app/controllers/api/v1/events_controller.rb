module Api
  module V1
    class EventsController < ApplicationController
        skip_before_action :authenticate_member!, only: [:index]
        before_action :set_event, only: %i[show edit update destroy]
        skip_before_action :authenticate_member!, only: [:index]
        helper_method :sort_column, :sort_direction
        respond_to :json
        
        # GET /events or /events.json
        def index
            @attendances = Attendance.all 
            @events = Event.order(sort_column + " " + sort_direction)
            @attendances = Attendance.all
            render json: @events
        end

        def current_events
            @events
        end

        # GET /events/1 or /events/1.json
        def show; end

        # GET /events/new
        def new
            @event = Event.new
        end

        # GET /events/1/edit
        def edit; end

        # POST /events or /events.json
        def create
            @event = Event.new(event_params)
            service = Google::Apis::CalendarV3::CalendarService.new
            service.authorization = google_secret.to_authorization
            calendar_id = 'scecattendancetracker@gmail.com'
            puts event_params
            start_date = Google::Apis::CalendarV3::EventDateTime.new
            start_date.date_time =  DateTime.iso8601(event_params["start_date"]).change(:offset => '-0600')
            end_date = Google::Apis::CalendarV3::EventDateTime.new
            end_date.date_time =  DateTime.iso8601(event_params["end_date"]).change(:offset => '-0600')

            code = create_code
            @event.code = code
            event_object = Google::Apis::CalendarV3::Event.new
            event_object.summary = event_params[:title]
            event_object.start = start_date
            event_object.end = end_date
            event_object.description = event_params[:description]
            event_object.location = event_params[:location]
                    
            response = service.insert_event(calendar_id, event_object)
            @event.google_event_id = response.id
            @event.average_rating = 0

            if @event.save
                render json: @event 
            else 
                puts @event.errors.full_messages
                render json: @event.errors 
            end
        end

        # PATCH/PUT /events/1 or /events/1.json
        def update
            @event = Event.find(params[:id])
            service = Google::Apis::CalendarV3::CalendarService.new
            service.authorization = google_secret.to_authorization
            calendar_id = 'scecattendancetracker@gmail.com'

            start_date = Google::Apis::CalendarV3::EventDateTime.new
            start_date.date_time =  DateTime.iso8601(event_params["start_date"]).change(:offset => '-0600')
            end_date = Google::Apis::CalendarV3::EventDateTime.new
            end_date.date_time =  DateTime.iso8601(event_params["end_date"]).change(:offset => '-0600')

            event_object = Google::Apis::CalendarV3::Event.new
            event_object.summary = event_params[:title]
            event_object.start = start_date
            event_object.end = end_date
            event_object.description = event_params[:description]
            event_object.location = event_params[:location]
            puts @event.google_event_id
                    
            response = service.update_event(calendar_id, @event.google_event_id, event_object)

        
            if @event.update(event_params)
                render json: @event
            else
                puts @event.errors.full_messages
                render json: @event.errors 
            end
           
        end

        # DELETE /events/1 or /events/1.json
        def destroy
            service = Google::Apis::CalendarV3::CalendarService.new
            service.authorization = google_secret.to_authorization
            calendar_id = 'scecattendancetracker@gmail.com'

            response = service.delete_event(calendar_id, @event.google_event_id, send_updates: 'all')
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

        def sort_column
            Event.column_names.include?(params[:sort]) ? params[:sort] : "id"
        end
        
        def sort_direction
            %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
        end

        # Use callbacks to share common setup or constraints between actions.
        def set_event
            @event = Event.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def event_params
            params.require(:event).permit(:title, :start_date, :end_date, :description, :location)
        end

        def google_secret
            scope = 'https://www.googleapis.com/auth/calendar.events.owned'
            Google::APIClient::ClientSecrets.new ({
                'web' => {
                    'access_token' => session[:g_credentials]['token'],
                    'client_id' => ENV['GOOGLE_OAUTH_CLIENT_ID'],
                    'client_secret' => ENV['GOOGLE_OAUTH_CLIENT_SECRET'],
                    'scope' => scope
                }
            }) 
        end
    end 
  end
end 
