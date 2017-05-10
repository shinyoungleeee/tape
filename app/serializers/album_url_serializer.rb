class AlbumUrlSerializer < ActiveModel::Serializer
  attributes :id, :service, :url
  belongs_to :album
end
