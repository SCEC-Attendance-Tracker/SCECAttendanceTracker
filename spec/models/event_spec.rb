require 'rails_helper'

RSpec.describe Event, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  subject do
      described_class.new(
          title: 'Test Event',
          start_date: DateTime.new(2021,2,3,4,5,6),
          end_date: DateTime.new(2021,2,3,4,5,6),
          description: 'Default Description',
          location: 'Zoom'
      )
  end

  it 'is valid with valid attributes' do
      expect(subject).to be_valid
  end

  it 'is not valid without a name' do
      subject.title = nil
      expect(subject).not_to be_valid
  end

  it 'is not valid without a start date' do
      subject.start_date = nil
      expect(subject).not_to be_valid
  end

  it 'is not valid without a end date' do
      subject.end_date = nil
      expect(subject).not_to be_valid
  end

end
