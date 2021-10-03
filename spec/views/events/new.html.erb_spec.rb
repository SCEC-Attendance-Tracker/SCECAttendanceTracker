require 'rails_helper'

RSpec.describe "events/new", type: :view do
  before(:each) do
    assign(:event, Event.new(
      eventTitle: "MyString",
      eventDescription: "MyString",
      eventLocation: "MyString"
    ))
  end

  it "renders new event form" do
    render

    assert_select "form[action=?][method=?]", events_path, "post" do

      assert_select "input[name=?]", "event[eventTitle]"

      assert_select "input[name=?]", "event[eventDescription]"

      assert_select "input[name=?]", "event[eventLocation]"
    end
  end
end
