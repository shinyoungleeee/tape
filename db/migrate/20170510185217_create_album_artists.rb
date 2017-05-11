class CreateAlbumArtists < ActiveRecord::Migration[5.0]
  def change
    create_table :album_associations do |t|
      t.belongs_to :album, null: false
      t.belongs_to :artist, null: false
      t.boolean :featured_artist, null: false, default: false

      t.timestamps
    end
  end
end
