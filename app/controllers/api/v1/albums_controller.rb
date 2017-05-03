class Api::V1::AlbumsController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Album.all, except: [:created_at, :updated_at], include: { album_urls: { except: [:album_id, :created_at, :updated_at] } }
  end
end
