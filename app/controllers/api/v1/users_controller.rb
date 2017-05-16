class Api::V1::UsersController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user
  end

  def albums
    user = User.find(params[:user_id])
    render json: Album.liked_by(user).sort_by(&:like_count).reverse
  end

  def groups
    user = User.find(params[:user_id])
    render json: Group.joins(:users).where(users: { id: user.id }).distinct
  end
end
