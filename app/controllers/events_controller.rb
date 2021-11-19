
require 'time'
require 'google/api_client/client_secrets.rb'
require 'google/apis/calendar_v3'
require 'googleauth'
# frozen_string_literal: true

class EventsController < ApplicationController
  skip_before_action :authenticate_member!, only: [:index]
  before_action :set_event, only: %i[show edit update destroy]
  skip_before_action :authenticate_member!, only: [:index]
  helper_method :sort_column, :sort_direction
  
  # GET /events or /events.json
  def index
    @events = Event.order(sort_column + " " + sort_direction)
    @attendances = Attendance.all
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
    puts event_params[:start_date]
    start_date = Google::Apis::CalendarV3::EventDateTime.new
    start_date.date_time =  DateTime.new(event_params["start_date(1i)"].to_i, 
                                          event_params["start_date(2i)"].to_i,
                                          event_params["start_date(3i)"].to_i,
                                          event_params["start_date(4i)"].to_i,
                                          event_params["start_date(5i)"].to_i).change(:offset => '-0600')
    end_date = Google::Apis::CalendarV3::EventDateTime.new
    end_date.date_time =  DateTime.new(event_params["end_date(1i)"].to_i, 
                                          event_params["end_date(2i)"].to_i,
                                          event_params["end_date(3i)"].to_i,
                                          event_params["end_date(4i)"].to_i,
                                          event_params["end_date(5i)"].to_i).change(:offset => '-0600')

    event_object = Google::Apis::CalendarV3::Event.new
    event_object.summary = event_params[:title]
    event_object.start = start_date
    event_object.end = end_date
    event_object.description = event_params[:description]
    event_object.location = event_params[:location]
			
		response = service.insert_event(calendar_id, event_object)
    @event.google_event_id = response.id
    respond_to do |format|
      if @event.save
        format.html { redirect_to events_url, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    @event = Event.find(params[:id])
    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = google_secret.to_authorization
    calendar_id = 'scecattendancetracker@gmail.com'

    start_date = Google::Apis::CalendarV3::EventDateTime.new
    start_date.date_time =  DateTime.new(event_params["start_date(1i)"].to_i, 
                                          event_params["start_date(2i)"].to_i,
                                          event_params["start_date(3i)"].to_i,
                                          event_params["start_date(4i)"].to_i,
                                          event_params["start_date(5i)"].to_i).change(:offset => '-0600')
    end_date = Google::Apis::CalendarV3::EventDateTime.new
    end_date.date_time =  DateTime.new(event_params["end_date(1i)"].to_i, 
                                          event_params["end_date(2i)"].to_i,
                                          event_params["end_date(3i)"].to_i,
                                          event_params["end_date(4i)"].to_i,
                                          event_params["end_date(5i)"].to_i).change(:offset => '-0600')

    event_object = Google::Apis::CalendarV3::Event.new
    event_object.summary = event_params[:title]
    event_object.start = start_date
    event_object.end = end_date
    event_object.description = event_params[:description]
    event_object.location = event_params[:location]
    puts @event.google_event_id
			
		response = service.update_event(calendar_id, @event.google_event_id, event_object)

    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = google_secret.to_authorization
    calendar_id = 'scecattendancetracker@gmail.com'

    response = service.delete_event(calendar_id, @event.google_event_id, send_updates: 'all')
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
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
