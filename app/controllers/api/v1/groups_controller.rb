class Api::V1::GroupsController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Group.all
  end

  def join

  end
end
