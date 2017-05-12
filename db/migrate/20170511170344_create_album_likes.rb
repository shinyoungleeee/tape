class CreateAlbumLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :album_likes do |t|
      t.belongs_to :user, null: false
      t.belongs_to :album, null: false
      t.integer :like, default: 1, null: false

      t.timestamps
    end
  end
end
