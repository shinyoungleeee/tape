require 'rails_helper'

RSpec.describe Album, type: :model do
  subject { create(:album) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:kind) }
  it { should allow_values('album', 'single', 'compilation').for(:kind) }
  it { should_not allow_values('dfsdfsdfsd', 'albums', 'singles', 'compilations').for(:kind) }
  it { should have_many(:album_urls) }
end
