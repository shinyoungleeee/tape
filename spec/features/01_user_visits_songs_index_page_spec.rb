require 'rails_helper'

feature 'user navigates to songs index page' do
  scenario 'sees a list of song names and links' do
    song_url = create(:song_url)

    visit songs_path

    expect(page).to have_content song_url.song.name
    expect(page).to have_link song_url.service
  end
  # scenario 'sees a maximum of 3 songs per row' do
  #   4.times { create(:meme) }
  #
  #   visit memes_path
  #
  #   expect(page.first('.text-center')).to have_css('img', count: 3)
  #   expect(page.all('.text-center')[1]).to have_css('img', count: 1)
  # end
end
