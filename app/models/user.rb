# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#  name            :string(255)      not null
#

class User < ActiveRecord::Base
  validates :email, :session_token, :name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true

  has_many :boards, dependent: :destroy
  has_many :card_assignments, dependent: :destroy
  has_many :board_memberships, dependent: :destroy

  attr_reader :password
  after_initialize :ensure_session_token

  def gravatar_url
    "http://www.gravatar.com/avatar/#{ Digest::MD5.hexdigest(email) }"
  end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.new_guest
    guest = create(name: 'Guest', email: 'guest@example.com', password: 'password')
    b = guest.boards.create(title: 'Welcome Tree')
    l1 = b.lists.create(title: 'This is a branch')
    l1.cards.create(title: 'This is a leaf.')
    l1.cards.create(title: 'Drag leaves to reorder them.')
    l1.cards.create(title: 'You can even drag them between branches!.')
    l1.cards.create(title: 'Use leaves to organize your project.')
    l2 = b.lists.create(title: 'Another branch')
    l2.cards.create(title: 'Use leaves to organize your project.')
    l2.cards.create(title: 'Enjoy your stay!.')
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
