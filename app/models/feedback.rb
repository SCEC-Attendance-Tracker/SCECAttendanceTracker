# frozen_string_literal: true

class Feedback < ApplicationRecord
  validates :event_id, presence: true
  validates :event_review, presence: true
  validates :event_rating_score, presence: true
end
