require "rails_helper"

RSpec.describe Api::V1::AlbumsController, type: :controller do
  let(:json_parsed_response)  { JSON.parse(response.body) }

  describe "GET #index" do
    it "returns albums with album urls" do
      a = create(:album_association)
      album = a.album
      artist = a.artist
      album_url = create(:album_url, album: album)

      get :index

      expect(response.status).to eq 200
      expect(json_parsed_response.first.keys).to eq ["id", "name", "image_url", "year", "kind", "like_count", "artists", "album_urls", "album_likes"]
      expect(json_parsed_response.first["id"]).to eq album.id
      expect(json_parsed_response.first["album_urls"].first.keys).to eq ["id", "service", "url"]
      expect(json_parsed_response.first["album_urls"].first["id"]).to eq album_url.id
      expect(json_parsed_response.first["artists"].first.keys).to eq ["id", "name"]
      expect(json_parsed_response.first["artists"].first["id"]).to eq artist.id
    end
  end
end
