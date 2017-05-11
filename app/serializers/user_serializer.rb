class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :handle, :image
  has_many :album_likes
end
