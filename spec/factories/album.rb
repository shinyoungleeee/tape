FactoryGirl.define do
  factory :album do
    sequence(:name) { |n| "Album #{n}"}
    image_url "https://i.scdn.co/image/dd182d5f557b4bbe3dc693cc29c1da0fe1009e31"
    year 2017
    kind "album"
  end
end
