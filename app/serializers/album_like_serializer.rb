class AlbumLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :user_handle, :is_current_user, :album_id, :like

  belongs_to :album
  belongs_to :user

  def user_handle
    object.user.handle
  end

  def is_current_user
    object.user == current_user
  end
end
