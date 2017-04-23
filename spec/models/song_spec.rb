require 'rails_helper'

RSpec.describe Song, type: :model do
  it { should validate_presence_of(:name) }
  it { should have_many(:song_urls) }
end
