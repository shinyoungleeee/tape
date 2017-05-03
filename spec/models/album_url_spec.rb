require 'rails_helper'

RSpec.describe AlbumUrl, type: :model do
  subject { create(:album_url) }
  it { should validate_presence_of(:album) }
  it { should validate_presence_of(:service) }
  it { should allow_values('Spotify', 'Apple Music').for(:service) }
  it { should_not allow_values('dfsdfsdfsd', 'spotify', 'spotifys', 'AppleMusic').for(:service) }
  it { should validate_presence_of(:url) }
  it { should validate_uniqueness_of(:url).scoped_to(:service) }
  it { should belong_to(:album) }
end
