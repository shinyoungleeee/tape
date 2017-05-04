# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# spotify_uris = [
#   '21bwCWvmjUvBqk3N8O6CqU',
#   '4eLPsYPBmXABThSJ821sqY',
#   '1lXY618HWkwYKJWBRYR4MK',
#   '0ETFjACtuP2ADo6LFhL6HN',
#   '1dZZh7PvVgce1DDsDPzy8Z',
#   '79dL7FLiJFOO0EoehUHQBv',
#   '19RUXBFyM4PpmrLRdtqWbp',
#   '36VJqCEgUg3nj0Eyxtc1av'
# ]
#
# year_regex = /\b(19|20)\d{2}\b/
#
# spotify_uris.each do |uri|
#   a = RSpotify::Album.find(uri)
#   b = Album.create(name: a.name, image_url: a.images[1]["url"], year: a.release_date[year_regex].to_i, kind: a.album_type)
#   AlbumUrl.create(album: b, service: "Spotify", url: a.external_urls["spotify"])
# end

apple_music_links = [
  'https://itunes.apple.com/us/album/standards-ballads/id271467962',
  'https://itunes.apple.com/us/album/damn/id1223592280',
  'https://itunes.apple.com/us/album/more-life/id1216986780',
  'https://itunes.apple.com/us/album/abbey-road/id401186200',
  'https://itunes.apple.com/us/album/99-9/id1092026376',
  'https://itunes.apple.com/us/album/currents/id989492285',
  'https://itunes.apple.com/us/album/kid-a/id1097862870',
  'https://itunes.apple.com/us/album/high-violet-expanded-edition/id401440905'
]

i = 1
apple_music_links.each do |link|
  AlbumUrl.create(album: Album.find(i), service: "Apple Music" url: link + '?app=music')
  i += 1
end
