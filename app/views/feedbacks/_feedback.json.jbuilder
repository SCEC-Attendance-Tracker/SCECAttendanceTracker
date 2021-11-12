# frozen_string_literal: true

json.extract! feedback, :id, :created_at, :updated_at
json.url feedback_url(feedback, format: :json)
