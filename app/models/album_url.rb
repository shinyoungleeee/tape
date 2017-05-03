class AlbumUrl < ApplicationRecord
  validates :album, presence: true
  validates :service, presence: true
  validates :service, inclusion: {
    in: ["Spotify", "Apple Music"],
    message: "must be 'Spotify' or 'Apple Music'"
  }
  validates :url, presence: true
  validates_uniqueness_of :url, scope: :service 

  belongs_to :album
end
