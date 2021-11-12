# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Member, type: :model do
  subject do
    described_class.new(first_name: 'Noah', last_name: 'Miner', email: 'noahjminer@gmail.com', img_url: 'url.com')
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a first_name' do
    subject.first_name = nil
    expect(subject).not_to be_valid
  end

  it 'is not valid without a last_name' do
    subject.last_name = nil
    expect(subject).not_to be_valid
  end

  it 'is not valid without an email' do
    subject.email = nil
    expect(subject).not_to be_valid
  end

  it 'is not valid without an img_url' do
    subject.img_url = nil
    expect(subject).not_to be_valid
  end
end
