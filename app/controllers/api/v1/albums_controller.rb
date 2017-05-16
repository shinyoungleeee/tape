class Api::V1::AlbumsController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Album.all.sort_by(&:like_count).reverse
  end

  def create
    album = Album.create(album_params)
    album_artists_params["artists"].each do |artist|
      existing_artist = Artist.find_by_name(artist["name"])
      if existing_artist.nil?
        AlbumAssociation.create(album: album, artist: Artist.create(artist))
      else
        AlbumAssociation.create(album: album, artist: existing_artist)
      end
    end
    album_urls_params["album_urls"].each do |url|
      new_url = AlbumUrl.new(url)
      new_url.album = album
      new_url.save
    end
    AlbumLike.create(user: current_user, album: album)
    render json: { status: "ok", statusText: "Successfully added and liked" }
  end

  def like
    album = Album.find(params[:album_id])
    like = album.album_likes.find_by_user_id(current_user.id)
    if like.nil?
      AlbumLike.create(album: album, user: current_user)
    else
      if like.liked?
        like.unliked!
      else like.unliked?
        like.liked!
      end
    end
    render json: { status: "ok", statusText: "Successfully updated" }
  end

  private

  def album_params
    params.require(:album).permit(:name, :image_url, :year, :kind)
  end

  def album_artists_params
    params.require(:album).permit(artists: [:name])
  end

  def album_urls_params
    params.require(:album).permit(album_urls: [:service, :url])
  end
end
