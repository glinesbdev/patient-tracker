# frozen_string_literal: true

class CreatePatients < ActiveRecord::Migration[6.0]
  def change
    create_table :patients, id: :uuid do |t|
      t.string :first_name, null: false
      t.string :middle_initial
      t.string :last_name, null: false
      t.string :date_of_birth, null: false
      t.string :email
      t.string :phone_number
      t.string :doctors_name, null: false
      t.string :condition, null: false
      t.boolean :follow_up_completed, null: false, default: false
      t.datetime :completed_at
      t.datetime :archived_at

      t.timestamps
    end
  end
end
