class Album < ApplicationRecord
  validates :name, presence: true
  validates :kind, presence: true
  validates :kind, inclusion: {
    in: ["album", "single", "compilation"],
    message: "must be 'album', 'single', or 'compilation'"
  }

  has_many :album_urls
end
