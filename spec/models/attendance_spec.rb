require 'rails_helper'
RSpec.describe Attendance, type: :model do

    let(:member) { Member.create(first_name: "a", last_name: "b", email: "a@b.c", description: "des", paid_dues: 0, admin: 0) }
    let(:event) { Event.create(title: "a", start_date: DateTime.new(2021,10,3,17,0,0), end_date: DateTime.new(2021,10,3,18,0,0), description: "des", location: "here") }
 
  subject do
    described_class.new(
      member_id: member.id,
      event_id: event.id
    )
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is invalid if it is a duplicate entry' do
    @invalid_attendance = Attendance.create(
      member_id: 1,
      event_id: 1
    )
    expect(@invalid_attendance.valid?).to be_falsey
  end

  it 'is invalid without member id' do
    subject.member_id = nil
    expect(subject).not_to be_valid
  end

  it 'is invalid without event id' do
    subject.event_id = nil
    expect(subject).not_to be_valid
  end

end
