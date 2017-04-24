class Album < ApplicationRecord
  validates :name, presence: true
  validates :kind, presence: true

  has_many :songs
end
