class AlbumUrl < ApplicationRecord
  validates :album, presence: true
  validates :service, presence: true
  validates :url, presence: true

  belongs_to :album
end
