class Event < ApplicationRecord
    validates :eventTitle, presence: true
    validates :eventStartDate, presence: true
    validates :eventEndDate, presence: true
    validates :eventDescription, presence: true
    validates :eventLocation, presence: true
    has_many :attachment_links
    has_many :attendances
    has_many :feedbacks
end
