class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.string :name, null: false
      t.string :image_url
      t.integer :year
      t.string :kind, null: false

      t.timestamps
    end
  end
end
