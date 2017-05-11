class Api::V1::UsersController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user
  end

  def albums
    user = User.find(params[:user_id])
    render json: Album.liked_by(user)
  end
end
