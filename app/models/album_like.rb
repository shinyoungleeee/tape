class AlbumLike < ApplicationRecord
  enum like: [ :unliked, :liked ]

  validates :user, presence: true
  validates :user, uniqueness: { scope: :album }
  validates :album, presence: true
  validates :like, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 1
  }

  belongs_to :user
  belongs_to :album
end
