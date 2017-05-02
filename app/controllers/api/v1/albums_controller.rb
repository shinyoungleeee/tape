class Api::V1::AlbumsController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Album.all, include: :album_urls
  end
end
