class Album < ApplicationRecord
  validates :name, presence: true
  validates :kind, presence: true

  has_many :album_urls
end
