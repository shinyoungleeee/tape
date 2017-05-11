class AlbumSearch
  alias :read_attribute_for_serialization :send

  def self.album_search(search_text)
    Album.where("name ILIKE ?", "%#{search_text}%") | Album.joins(:artists).where("artists.name ILIKE ?", "%#{search_text}%")
  end

  def self.stream_search(search_text)
    new_albums = []
    year_regex = /\b(19|20)\d{2}\b/
    RSpotify::Album.search(search_text).each do |spotify_album|
      album = Album.new(name: spotify_album.name, image_url: spotify_album.images[1]["url"], year: spotify_album.release_date[year_regex].to_i, kind: spotify_album.album_type)
      album.album_urls = []
      album.album_urls << AlbumUrl.new(service: "Spotify", url: spotify_album.external_urls["spotify"])
      album.artists = []
      spotify_album.artists.each do |s_artist|
        album.artists << Artist.new(name: s_artist.name)
      end

      already_exists = Album.all.any? do |existing_album|
        if existing_album.name == album.name
          existing_album.artists.all? do |existing_album_artist|
            album.artists.any? do |new_artist|
              existing_album_artist.name == new_artist.name
            end
          end
        end
      end
      if !already_exists
        new_albums << album
      end
    end
    ITunesSearchAPI.search(term: search_text, country: "US", media: "music", entity: "album").each do |itunes_album|
      itunes_uri_path = URI.parse(itunes_album["collectionViewUrl"]).path
      itunes_url = "https://itunes.apple.com" + itunes_uri_path + "?app=music"
      itunes_image_url = itunes_album["artworkUrl100"].gsub("100x100bb", "300x300bb")
      itunes_name = itunes_album["collectionName"].sub /\ - (EP|Single)\z/, ''
      itunes_kind = "album"
      if itunes_album["collectionName"][/\ - (EP|Single)\z/]
        itunes_kind = "single"
      end
      album = Album.new(name: itunes_name, image_url: itunes_image_url, year: itunes_album["releaseDate"][year_regex].to_i, kind: itunes_kind)

      album.album_urls = []
      album.album_urls << AlbumUrl.new(service: "Apple Music", url: itunes_url)
      album.artists = []
      artists = itunes_album["artistName"].gsub(" & ", ", ").split(", ")
      artists.each do |i_artist|
        album.artists << Artist.new(name: i_artist)
      end

      already_exists = Album.all.any? do |existing_album|
        if existing_album.name == album.name
          existing_album.artists.all? do |existing_album_artist|
            album.artists.any? do |new_artist|
              existing_album_artist.name == new_artist.name
            end
          end
        end
      end
      already_added = new_albums.any? do |new_album|
        if new_album.name == album.name
          new_album.artists.all? do |new_album_artist|
            album.artists.any? do |new_artist|
              new_album_artist.name == new_artist.name
            end
          end
        end
      end

      if already_added && !already_exists
        album = new_albums.find do |new_album|
          if new_album.name == album.name
            new_album.artists.all? do |new_album_artist|
              album.artists.any? do |new_artist|
                new_album_artist.name == new_artist.name
              end
            end
          end
        end
        album.album_urls << AlbumUrl.new(service: "Apple Music", url: itunes_url)
      elsif !already_added && !already_exists
        new_albums << album
      end
    end
    new_albums
  end
end
