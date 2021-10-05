json.extract! event, :id, :title, :star_dDate, :end_date, :description, :location, :created_at, :updated_at
json.url event_url(event, format: :json)
