FactoryGirl.define do
  factory :user, aliases: [:creator] do
    sequence(:name) { |n| "Frank Tank #{n}" }
    sequence(:handle) { |n| "frankthetank#{n}" }
    sequence(:email) { |n| "frank#{n}@thetank.com" }
    password 'password'
  end
end
