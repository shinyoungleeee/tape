class Api::V1::GroupsController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Group.all
  end

  def show
    render json: Group.find(params[:id])
  end

  def join
    this_group = Group.find(params[:group_id])
    if this_group.did_user_join(current_user)
      UserGroup.delete(UserGroup.where(user: current_user, group: this_group))
    else
      UserGroup.create(user: current_user, group: this_group)
    end
    render json: this_group
  end

  def albums
    this_group = Group.find(params[:group_id])
    render json: this_group.albums
  end
end
