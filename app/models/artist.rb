class Artist < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :album_associations
  has_many :albums, through: :album_associations
end
