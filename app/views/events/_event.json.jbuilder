json.extract! event, :id, :eventTitle, :eventStartDate, :eventEndDate, :eventDescription, :eventLocation, :created_at, :updated_at
json.url event_url(event, format: :json)
