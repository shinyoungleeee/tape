class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :private, :user_joined
  belongs_to :creator, serializer: UserSerializer
  has_many :users
  has_many :albums, serializer: AlbumSerializer

  def user_joined
    object.users.any? { |user| user == current_user }
  end
end
