class AlbumLike < ApplicationRecord
  enum like: [ :unliked, :liked ]

  validates :user, presence: true
  validates :user, uniqueness: { scope: :album }
  validates :album, presence: true
  validates :like, inclusion: {
    in: ["liked", "unliked"],
    message: "must be 'liked' or 'unliked'"
  }

  belongs_to :user
  belongs_to :album
end
