require 'rails_helper'

RSpec.describe "events/show", type: :view do
  before(:each) do
    @event = assign(:event, Event.create!(
      eventTitle: "Event Title",
      eventDescription: "Event Description",
      eventLocation: "Event Location",
      eventStartDate: DateTime.new(2021,2,3,4,5,6),
      eventEndDate: DateTime.new(2021,2,3,4,5,6)
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Event Title/)
    expect(rendered).to match(/Event Description/)
    expect(rendered).to match(/Event Location/)
  end
end
