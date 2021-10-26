# frozen_string_literal: true

class Attachment < ApplicationRecord
  has_many :attachment_links
end
