class Album < ApplicationRecord
  validates :name, presence: true
  validates :kind, presence: true
  validates :kind, inclusion: {
    in: ["album", "single", "compilation"],
    message: "must be 'album', 'single', or 'compilation'"
  }

  has_many :album_urls
  has_many :album_associations
  has_many :artists, through: :album_associations
  has_many :album_likes

  def self.liked_by(user)
    joins(:album_likes).where(album_likes: { user: user, like: "liked" })
  end
end
