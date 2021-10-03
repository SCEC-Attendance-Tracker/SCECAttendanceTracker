require 'rails_helper'

RSpec.describe "events/edit", type: :view do
  before(:each) do
    @event = assign(:event, Event.create!(
      eventTitle: "MyString",
      eventDescription: "MyString",
      eventLocation: "MyString",
      eventStartDate: DateTime.new(2021,2,3,4,5,6),
      eventEndDate: DateTime.new(2021,2,3,4,5,6)
    ))
  end

  it "renders the edit event form" do
    render

    assert_select "form[action=?][method=?]", event_path(@event), "post" do

      assert_select "input[name=?]", "event[eventTitle]"

      assert_select "input[name=?]", "event[eventDescription]"

      assert_select "input[name=?]", "event[eventLocation]"
    end
  end
end
