FactoryGirl.define do
  factory :song do
    sequence(:name) { |n| "Song #{n}" }
    sequence(:track) { |n| n }
    disc 1
    album
  end
end
