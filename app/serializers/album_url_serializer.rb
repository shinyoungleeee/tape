class AlbumUrlSerializer < ActiveModel::Serializer
  attributes :id, :album_id, :service, :url
  belongs_to :album
end
