class CreateUserGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :user_groups do |t|
      t.belongs_to :user, null: false
      t.belongs_to :group, null: false

      t.timestamps
    end
  end
end
