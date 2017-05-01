class Song < ApplicationRecord
  validates :name, presence: true
  validates :album, presence: true
  validates :track, presence: true
  validates :disc, presence: true

  has_many :song_urls
  belongs_to :album
end
