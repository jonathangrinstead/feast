class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, dependent: :destroy
  has_many :instructions, dependent: :destroy
  has_many :likes
  has_many :likers, through: :likes, source: :user

  accepts_nested_attributes_for :ingredients, allow_destroy: true
  accepts_nested_attributes_for :instructions, allow_destroy: true

  has_one_attached :photo

  scope :shared, -> { where(is_shareable: true) }
  scope :most_recent, -> { order(created_at: :desc) }
end
