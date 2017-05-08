class Api::V1::SearchesController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    albums = Album.search(search_params["search_text"])
    render json: albums, except: [:created_at, :updated_at], include: { album_urls: { except: [:album_id, :created_at, :updated_at] } }
  end

  private

  def search_params
    params.require(:search).permit(:search_text)
  end
end
