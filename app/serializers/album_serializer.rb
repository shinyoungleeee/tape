class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :year, :kind, :album_urls
  has_many :album_urls
end
