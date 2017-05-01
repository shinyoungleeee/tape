class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.integer :track, null: false
      t.integer :disc, default: 0
      t.belongs_to :album, null: false

      t.timestamps
    end
  end
end
