class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :year, :kind
  has_many :artists
  has_many :album_urls
  has_many :album_likes
end
