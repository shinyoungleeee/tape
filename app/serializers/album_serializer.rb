class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :year, :kind, :like_count
  has_many :artists
  has_many :album_urls
  has_many :album_likes

  def like_count
    object.album_likes.length
  end
end
