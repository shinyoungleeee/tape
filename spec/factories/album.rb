FactoryGirl.define do
  factory :album do
    sequence(:name) { |n| "Album #{n}" }
    year 2017
    kind "album"
  end
end
