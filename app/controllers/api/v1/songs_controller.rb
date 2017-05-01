class Api::V1::SongsController < ApiController
  def index
    respond_to do |format|
      format.json do
        render json: Song.all.to_json(include: [:song_urls, :album])
      end
    end
  end
end
