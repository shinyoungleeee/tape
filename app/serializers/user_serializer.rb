class UserSerializer < ActiveModel::Serializer
  attributes :id, :handle, :image, :is_current_user
  has_many :album_likes

  def is_current_user
    object == current_user
  end
end
