class AlbumAssociation < ApplicationRecord
  belongs_to :album
  belongs_to :artist
end
