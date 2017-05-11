class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :year, :kind, :artists, :album_urls
  has_many :album_urls
  has_many :artists
end
