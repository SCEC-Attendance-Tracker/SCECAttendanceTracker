require 'rails_helper'

RSpec.describe "attendances/index", type: :view do
  before(:each) do
    assign(:attendances, [
      Attendance.create!(
        member_id: "",
        event_id: ""
      ),
      Attendance.create!(
        member_id: "",
        event_id: ""
      )
    ])
  end

  it "renders a list of attendances" do
    render
    assert_select "tr>td", text: "".to_s, count: 2
    assert_select "tr>td", text: "".to_s, count: 2
  end
end
