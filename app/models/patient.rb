# frozen_string_literal: true

class Patient < ApplicationRecord
  include ActionView::Helpers::DateHelper
  validates_presence_of :first_name, :last_name, :date_of_birth, :doctors_name, :condition
  validates :email, allow_blank: true,
                    format: { with: /@/, message: 'Please enter a valid email address.' }
  validates :phone_number, allow_blank: true,
                           format: { with: /\d{3}-\d{3}-\d{4}/, message: 'Please enter a valid US formatted phone number.' }

  def name
    "#{last_name}, #{first_name}, #{middle_initial}"
  end

  def status
    return :Archived if archived?

    follow_up_completed ? :Completed : :Pending
  end

  def time_since_created
    time_ago_in_words(created_at)
  end

  def time_since_completed
    return unless completed_at.present?

    time_ago_in_words(completed_at)
  end

  def time_since_archived
    return unless archived?

    time_ago_in_words(archived_at)
  end

  def archived?
    archived_at.present?
  end
end
