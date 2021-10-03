require 'rails_helper'

RSpec.describe Event, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  subject do
      described_class.new(
          eventTitle: 'Test Event',
          eventStartDate: DateTime.new(2021,2,3,4,5,6),
          eventEndDate: DateTime.new(2021,2,3,4,5,6),
          eventDescription: 'Default Description',
          eventLocation: 'Zoom'
      )
  end

  it 'is valid with valid attributes' do
      expect(subject).to be_valid
  end

  it 'is not valid without a name' do
      subject.eventTitle = nil
      expect(subject).not_to be_valid
  end

  it 'is not valid without a start date' do
      subject.eventStartDate = nil
      expect(subject).not_to be_valid
  end

  it 'is not valid without a end date' do
      subject.eventEndDate = nil
      expect(subject).not_to be_valid
  end

end
