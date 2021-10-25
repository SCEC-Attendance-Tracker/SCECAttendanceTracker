class Feedback < ApplicationRecord
    belongs_to :event
    validates :event_id, presence: true
    validates :event_review, presence: true
    validates :event_rating_score, presence: true
end
