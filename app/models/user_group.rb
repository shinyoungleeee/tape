class UserGroup < ApplicationRecord
  validates :user, presence: true
  validates :group, presence: true

  belongs_to :user
  belongs_to :group
end
