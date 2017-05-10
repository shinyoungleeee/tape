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
    ITunesSearchAPI.search(term: search_text, :country => "US", :media => "music", entity: "album").each do |itunes_album|
      already_exists = Album.all.any? do |existing_album|
        existing_album.name == itunes_album["collectionName"]
      end
      already_added = @albums.any? do |new_album|
        new_album.name == itunes_album["collectionName"]
      end
      uri_path = URI.parse(itunes_album["collectionViewUrl"]).path
      itunes_url = "https://itunes.apple.com" + uri_path + "?app=music"
      if already_added && !already_exists
        album = @albums.find { |new_album| new_album.name == itunes_album["collectionName"] }
        album.album_urls << AlbumUrl.new(service: "Apple Music", url: itunes_url)
      elsif !already_added && !already_exists
        album = Album.new(name: itunes_album["collectionName"], image_url: itunes_album["artworkUrl100"], year: itunes_album["releaseDate"][year_regex].to_i, kind: "album")
        album.album_urls = []
        album.album_urls << AlbumUrl.new(service: "Apple Music", url: itunes_url)
        @albums << album
      end
    end
  end
end
