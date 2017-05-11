class Api::V1::SearchController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def albums
    render json: AlbumSearch.album_search(search_params["search_text"])
  end

  def streams
    render json: AlbumSearch.stream_search(search_params["search_text"])
  end

  def test
    render json: AlbumSearch.stream_search("bon iver")
  end

  private

  def search_params
    params.require(:search).permit(:search_text)
  end
end
