FactoryGirl.define do
  factory :song_url do
    song
    service "Spotify"
    url RSpotify::Artist.search("Michael Jackson").first.top_tracks(:US)[1].external_urls["spotify"]
  end
end
