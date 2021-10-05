# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'events/index', type: :view do
  before(:each) do
    assign(:events, [
             Event.create!(
               title: 'Event Title',
               description: 'Event Description',
               location: 'Event Location',
               start_date: DateTime.new(2021, 2, 3, 4, 5, 6),
               end_date: DateTime.new(2021, 2, 3, 4, 5, 6)
             ),
             Event.create!(
               title: 'Event Title',
               description: 'Event Description',
               location: 'Event Location',
               start_date: DateTime.new(2021, 2, 3, 4, 5, 6),
               end_date: DateTime.new(2021, 2, 3, 4, 5, 6)
             )
           ])
  end

  it 'renders a list of events' do
    render
    assert_select 'tr>td', text: 'Event Title'.to_s, count: 2
    assert_select 'tr>td', text: 'Event Description'.to_s, count: 2
    assert_select 'tr>td', text: 'Event Location'.to_s, count: 2
  end
end
