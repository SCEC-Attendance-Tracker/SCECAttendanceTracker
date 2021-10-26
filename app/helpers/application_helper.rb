# frozen_string_literal: true

module ApplicationHelper
  def error_messages_for(object)
    render(partial: 'application/error_messages', locals: { object: object })
  end
end

def sortable(column, title = nil)
  title ||= column.titleize
  direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
  link_to title, {:sort => column, :direction => direction}
end