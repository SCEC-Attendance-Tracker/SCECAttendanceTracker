# frozen_string_literal: true

json.array! @feedbacks, partial: 'feedbacks/feedback', as: :feedback
