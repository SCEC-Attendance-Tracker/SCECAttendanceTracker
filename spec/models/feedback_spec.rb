# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Feedback, type: :model do
  let(:event) do
    Event.create(title: 'New Event', start_date: DateTime.new(2021, 10, 3, 17, 0, 0),
                 end_date: DateTime.new(2021, 10, 3, 18, 0, 0), description: 'description', location: 'MSC')
  end
  subject do
    described_class.new(event_id: event.id, event_review: 'The event was very good', event_rating_score: 5)
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a event_review' do
    subject.event_review = nil
    expect(subject).not_to be_valid
  end

  it 'is not valid without an event_rating_score ' do
    subject.event_rating_score = nil
    expect(subject).not_to be_valid
  end
end
