class Event < ApplicationRecord
    validates :title, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates :description, presence: true
    validates :location, presence: true
    
    has_many :attachment_links
    has_many :attendances
    has_many :feedbacks
end
