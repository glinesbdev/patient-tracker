# frozen_string_literal: true

# Clear the model data out of the database to start fresh
Patient.destroy_all

Faker::Config.locale = 'en-US'

conditions = [
  'Rheumatoid Arthritis',
  'Asthma',
  'Bacterial Meningitis',
  'Epilepsy',
  'Rotavirus Infection',
  'Bronchitis',
  'Otitis Media',
  "Alzheimer's Disease",
  'E. coli Infection'
]

doctors_names = [
  'Dr. Jillian Benitz',
  'Dr. Kennedy Elsbree',
  'Dr. Lorenzo Glesener',
  'Dr. Willard Mccurtis',
  'Dr. Zion Wahlman',
  'Dr. Ethel Debreto',
  'Dr. Hunter Feth',
  'Dr. Isla Praska',
  'Dr. Karson Santano',
  'Dr. Maria Vandygriff'
]

100.times do |_n|
  Patient.create!(
    first_name: Faker::Name.first_name,
    middle_initial: Faker::Name.middle_name.first,
    last_name: Faker::Name.last_name,
    date_of_birth: Faker::Date.birthday,
    email: Faker::Internet.email,
    phone_number: Faker::Base.numerify('###-###-####'),
    condition: conditions.sample,
    doctors_name: doctors_names.sample
  )
end
