require 'rails_helper'

RSpec.describe "links/new", type: :view do
  before(:each) do
    assign(:link, Link.new(
      name: "MyString",
      url: "MyText",
      description: "MyText"
    ))
  end

  it "renders new link form" do
    render

    assert_select "form[action=?][method=?]", links_path, "post" do

      assert_select "input[name=?]", "link[name]"

      assert_select "textarea[name=?]", "link[url]"

      assert_select "textarea[name=?]", "link[description]"
    end
  end
end
