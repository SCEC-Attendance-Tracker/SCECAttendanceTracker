# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'feedbacks/show', type: :view do
  before(:each) do
    @feedback = assign(:feedback, Feedback.create!)
  end

  xit 'renders attributes in <p>' do
    render
  end
end
