class AddColumnsToSongs < ActiveRecord::Migration[5.0]
  def change
    add_belongs_to :songs, :album, null: false
    add_column :songs, :track, :integer
    add_column :songs, :disc, :integer
  end
end
