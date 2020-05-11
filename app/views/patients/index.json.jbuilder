# frozen_string_literal: true

json.patients @patients, partial: 'patients/patient', as: :patient
json.pagination do
  json.page @page
  json.page_limit @page_limit
  json.total_patients @total_patients
  json.total_pages @total_pages
  json.prev_page @prev_page
  json.next_page @next_page
  json.count_start @count_start
  json.count_end @count_end
end
