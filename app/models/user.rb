class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  has_one_attached :photo
  has_many :recipes
  has_many :likes
  has_many :liked_recipes, through: :likes, source: :recipe
  has_many :bookmarks
end
