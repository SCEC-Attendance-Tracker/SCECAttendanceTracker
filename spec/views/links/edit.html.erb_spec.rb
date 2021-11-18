require 'rails_helper'

RSpec.describe "links/edit", type: :view do
  before(:each) do
    @link = assign(:link, Link.create!(
      name: "MyString",
      url: "MyText",
      description: "MyText"
    ))
  end

  it "renders the edit link form" do
    render

    assert_select "form[action=?][method=?]", link_path(@link), "post" do

      assert_select "input[name=?]", "link[name]"

      assert_select "textarea[name=?]", "link[url]"

      assert_select "textarea[name=?]", "link[description]"
    end
  end
end
