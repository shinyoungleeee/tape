class Api::SongsController < ApiController
  def show
    respond_to do |format|
      format.json do
        render json: Song.all.to_json(include: :song_urls)
      end
    end
  end
end
