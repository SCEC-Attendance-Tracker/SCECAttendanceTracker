# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'events/edit', type: :view do
  before(:each) do
    @event = assign(:event, Event.create!(
                              title: 'MyString',
                              description: 'MyString',
                              location: 'MyString',
                              start_date: DateTime.new(2021, 2, 3, 4, 5, 6),
                              end_date: DateTime.new(2021, 2, 3, 4, 5, 6)
                            ))
  end

  it 'renders the edit event form' do
    render

    assert_select 'form[action=?][method=?]', event_path(@event), 'post' do
      assert_select 'input[name=?]', 'event[title]'

      assert_select 'input[name=?]', 'event[description]'

      assert_select 'input[name=?]', 'event[location]'
    end
  end
end
