class AttachmentLink < ApplicationRecord
    belongs_to :attachment
    belongs_to :event
end
