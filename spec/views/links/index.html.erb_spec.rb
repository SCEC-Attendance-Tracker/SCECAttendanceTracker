require 'rails_helper'

RSpec.describe "links/index", type: :view do
  before(:each) do
    assign(:links, [
      Link.create!(
        name: "Name",
        url: "MyText",
        description: "MyText"
      ),
      Link.create!(
        name: "Name",
        url: "MyText",
        description: "MyText"
      )
    ])
  end

  it "renders a list of links" do
    render
    assert_select "tr>td", text: "Name".to_s, count: 2
    assert_select "tr>td", text: "MyText".to_s, count: 2
    assert_select "tr>td", text: "MyText".to_s, count: 2
  end
end
