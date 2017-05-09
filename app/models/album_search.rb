class AlbumSearch
  alias :read_attribute_for_serialization :send
  attr_reader :albums

  def initialize(search_text)
    @albums = []
    year_regex = /\b(19|20)\d{2}\b/
    RSpotify::Album.search(search_text).each do |spotify_album|
      album = Album.new(name: spotify_album.name, image_url: spotify_album.images[1]["url"], year: spotify_album.release_date[year_regex].to_i, kind: spotify_album.album_type)
      album.album_urls = []
      album.album_urls << AlbumUrl.new(service: "Spotify", url: spotify_album.external_urls["spotify"])
      @albums << album
    end
  end
end
