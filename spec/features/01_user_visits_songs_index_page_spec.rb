require 'rails_helper'

feature 'user navigates to songs index page' do
  scenario 'sees a list of song names' do
    song = create(:song)

    visit songs_path

    expect(page).to have_content song.name
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
