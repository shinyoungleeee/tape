require 'rails_helper'

RSpec.describe SongUrl, type: :model do
  it { should validate_presence_of(:song) }
  it { should validate_presence_of(:service) }
  it { should validate_presence_of(:url) }
  it { should belong_to(:song) }
end
