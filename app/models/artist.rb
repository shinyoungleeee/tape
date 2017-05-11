class Artist < ApplicationRecord
  has_many :album_associations
  has_many :albums, through: :album_associations
end
