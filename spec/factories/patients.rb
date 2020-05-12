# frozen_string_literal: true

FactoryBot.define do
  factory :patient do
    first_name { 'Peggy' }
    middle_initial { 'K' }
    last_name { 'Jones' }
    date_of_birth { '05/23/1990' }
    email { 'peggyk@gmail.com' }
    phone_number { '555-555-5555' }
    condition { 'Bronchitis' }
    doctors_name { 'Dr. Willard Mccurtis' }
  end
end
