require 'rails_helper'

RSpec.describe Feedback, type: :model do
  subject do
    described_class.new(event_review: 'The event was very good', event_rating_score: 10)
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
