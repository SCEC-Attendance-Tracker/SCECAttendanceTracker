class Event < ApplicationRecord
    has_many :attachment_links
    has_many :attendances
    has_many :feedbacks
end
