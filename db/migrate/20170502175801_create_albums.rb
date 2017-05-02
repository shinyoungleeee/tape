class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.string :name, null: false
      t.string :image_url, default: "./tape-icon.png"
      t.integer :year
      t.string :kind, null: false

      t.timestamps
    end
  end
end
