class Recipe < ApplicationRecord
  include PgSearch::Model
  belongs_to :user
  has_many :ingredients, dependent: :destroy
  has_many :instructions, dependent: :destroy
  has_many :likes
  has_many :likers, through: :likes, source: :user
  has_many :bookmarks
  has_many :comments

  accepts_nested_attributes_for :ingredients, allow_destroy: true
  accepts_nested_attributes_for :instructions, allow_destroy: true

  has_one_attached :photo

  scope :shared, -> { where(is_shareable: true) }
  scope :most_recent, -> { order(created_at: :desc) }

  pg_search_scope :search_by_title, 
  against: :title, 
  using: {
    tsearch: { prefix: true }
  },
  associated_against: {
    user: :name
  },
  using: :tsearch,
  scope: :shared
end
