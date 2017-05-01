FactoryGirl.define do
  factory :song_url do
    song
    service "Spotify"
    url "https://open.spotify.com/track/7J1uxwnxfQLu4APicE5Rnj"
  end
end
