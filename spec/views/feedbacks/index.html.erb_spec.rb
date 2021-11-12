# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'feedbacks/index', type: :view do
  before(:each) do
    assign(:feedbacks, [
             Feedback.create!,
             Feedback.create!
           ])
  end

  xit 'renders a list of feedbacks' do
    render
  end
end
