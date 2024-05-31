class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validate :password_complexity
  validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'is not a valid email' }
  has_one_attached :photo
  
  has_many :recipes
  has_many :likes
  has_many :liked_recipes, through: :likes, source: :recipe
  has_many :bookmarks
  has_many :comments
  has_many :active_follows, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :following, through: :active_follows, source: :followed

  has_many :passive_follows, class_name: 'Follow', foreign_key: 'followed_id', dependent: :destroy
  has_many :followers, through: :passive_follows, source: :follower

  has_many :notifications, as: :recipient, dependent: :destroy, class_name: 'Noticed::Notification'
  has_many :notification_mentions, as: :record, dependent: :destroy, class_name: 'Noticed::Event'

  has_many :chatrooms_users
  has_many :chatrooms, through: :chatrooms_users

  def following?(user)
    following.include?(user)
  end

  private 

  def password_complexity
    if password.present?
      unless password.length >= 8
        errors.add :password, 'must be at least 8 characters long'
      end

      unless password =~ /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/
        errors.add :password, 'must include at least one lowercase letter, one uppercase letter, one digit, and one special character'
      end

      common_passwords = %w[password 123456 qwerty 111111 abc123]
      if common_passwords.include?(password.downcase)
        errors.add :password, 'is too common'
      end
    end
  end
end
