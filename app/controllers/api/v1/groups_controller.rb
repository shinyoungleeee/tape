class Api::V1::GroupsController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Group.all
  end

  def show
    render json: Group.find(params[:id])
  end

  def join

  end

  def albums
    this_group = Group.find(params[:group_id])
    render json: this_group.albums
  end
end
