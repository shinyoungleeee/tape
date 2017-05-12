class Group < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: { scope: :creator }
  validates :private, inclusion: {
    in: [false, true],
    message: "must be boolean"
  }
  validates :creator, presence: true

  has_many :user_groups
  has_many :users, through: :user_groups
  belongs_to :creator, class_name: "User"

  def albums
    Album.joins(:album_likes).where(album_likes: { user: self.users, like: "liked" }).uniq
  end
end
