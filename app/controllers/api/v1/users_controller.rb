class Api::V1::UsersController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    render json: {
      current_user: current_user,
      signed_in: user_signed_in?
    }
  end
end
