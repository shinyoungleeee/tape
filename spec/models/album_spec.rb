require 'rails_helper'

RSpec.describe Album, type: :model do
  subject { create(:album) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:kind) }
  it { should allow_values('album', 'single', 'compilation').for(:kind) }
  it { should_not allow_values('dfsdfsdfsd', 'albums', 'singles', 'compilations').for(:kind) }
  it { should have_many(:album_urls) }
  it { should have_many(:album_associations) }
  it { should have_many(:artists) }
  it { should have_many(:album_likes) }

  describe "#self.liked_by(user)" do
    it "should return an array of the albums liked by that user" do
      like = create(:album_like)
      expect(Album.liked_by(like.user).first).to eq(like.album)
    end

    it "should not return albums unliked by that user" do
      like = create(:album_like)
      like.unliked!
      expect(Album.liked_by(like.user)).to eq([])
    end
  end

  describe "#like_count" do
    it "should return the number of users that liked the album" do
      like = create(:album_like)
      expect(like.album.like_count).to eq 1

      create(:album_like, album: like.album)
      expect(like.album.like_count).to eq 2

      create(:album_like)
      expect(like.album.like_count).to eq 2

      like.unliked!
      expect(like.album.like_count).to eq 1
    end
  end
end
