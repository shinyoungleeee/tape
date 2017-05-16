require 'rails_helper'

RSpec.describe User, type: :model do
  subject { create(:user) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:handle) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }
  it { should have_many(:album_likes) }
  it { should have_many(:user_groups) }
  it { should have_many(:groups) }
  it { should have_many(:created_groups) }
end
