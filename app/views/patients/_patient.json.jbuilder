# frozen_string_literal: true

json.extract! patient, :id, :first_name, :middle_initial, :last_name, :date_of_birth, :email, :phone_number, :doctors_name, :condition, :follow_up_completed, :created_at, :updated_at, :name, :status, :time_since_created, :time_since_completed, :time_since_archived, :archived_at
json.url patient_url(patient, format: :json)
