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

  def self.search(search)
    where("name ILIKE ?", "%#{search}%") | self.joins(:artists).where("artists.name ILIKE ?", "%#{search}%")
  end
end
