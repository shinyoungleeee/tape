class AlbumAssociation < ApplicationRecord
  validates :album, uniqueness: { scope: :artist }

  belongs_to :album
  belongs_to :artist
end
