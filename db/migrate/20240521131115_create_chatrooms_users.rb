class CreateChatroomsUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :chatrooms_users do |t|
      t.references :chatroom, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
