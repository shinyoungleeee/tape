class Api::V1::SearchController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def albums
    render json: Album.search(search_params["search_text"])
  end

  def streams
    render json: AlbumSearch.new(search_params["search_text"]).albums
  end

  def test
    render json: AlbumSearch.new("bon iver").albums
  end

  private

  def search_params
    params.require(:search).permit(:search_text)
  end
end
