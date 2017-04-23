class Song < ApplicationRecord
  validates :name, presence: true

  has_many :song_urls
end
