class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :private
  belongs_to :creator, serializer: UserSerializer
  has_many :users
  has_many :albums, serializer: AlbumSerializer
end
