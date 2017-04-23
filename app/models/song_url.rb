class SongUrl < ApplicationRecord
  validates :song, presence: true
  validates :service, presence: true
  validates :url, presence: true

  belongs_to :song
end
