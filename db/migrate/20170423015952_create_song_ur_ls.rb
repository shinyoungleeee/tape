class CreateSongUrLs < ActiveRecord::Migration[5.0]
  def change
    create_table :song_urls do |t|
      t.belongs_to :song, null: false
      t.string :service, null: false
      t.string :url, null: false

      t.timestamps
    end
  end
end
