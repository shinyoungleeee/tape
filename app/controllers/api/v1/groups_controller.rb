class Api::V1::GroupsController < ApiController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Group.all
  end

  def show
    render json: Group.find(params[:id])
  end

  def create
    new_group = Group.new(group_params)
    new_group.creator = current_user
    if user_signed_in?
      if new_group.save
        UserGroup.create(user: current_user, group: new_group)
        render json: ["Successfully added"]
      else
        render json: new_group.errors.full_messages
      end
    else
      render json: ["Please sign in first"]
    end
  end

  def join
    this_group = Group.find(params[:group_id])
    if this_group.did_user_join(current_user)
      UserGroup.where(user: current_user, group: this_group).destroy
    else
      UserGroup.create(user: current_user, group: this_group)
    end
    render json: this_group
  end

  def albums
    this_group = Group.find(params[:group_id])
    render json: this_group.albums
  end

  private

  def group_params
    params.require(:group).permit(:name, :description)
  end
end
