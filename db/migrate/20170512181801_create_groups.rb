class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.string :description
      t.boolean :private, null: false, default: false
      t.integer :creator_id, null: false

      t.timestamps
    end
  end
end
