# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Patient', type: :feature, js: true do
  before do
    create(:patient)
  end

  describe 'index page' do
    it 'shows the header' do
      visit root_path
      expect(page).to have_text(:all, 'Worklist')
    end

    it 'has an Add Patient button' do
      visit root_path
      expect(page).to have_css('.add-patient-btn')
    end

    it 'can submit a new patient and view details' do
      visit root_path
      click_button 'Add Patient'

      fill_in name: 'patient[first_name]', with: 'Jon'
      fill_in name: 'patient[middle_initial]', with: 'D'
      fill_in name: 'patient[last_name]', with: 'Doe'
      fill_in name: 'patient[date_of_birth]', with: '02/15/1987'
      fill_in name: 'patient[phone_number]', with: '555-555-5555'
      fill_in name: 'patient[email]', with: 'me@email.com'
      select 'Dr. Willard Mccurtis', from: 'Doctor'
      fill_in name: 'patient[condition]', with: 'Broken Arm'

      click_button 'Add'

      expect(page).to have_text(:all, 'Doe, Jon, D')
    end

    it 'displays patient information' do
      visit root_path
      find('.patient-name', text: 'Jones, Peggy, K').click

      expect(page).to have_text(:all, 'Dr. Willard Mccurtis')
      expect(page).to have_text(:all, 'Bronchitis')
      expect(page).to have_text(:all, 'Pending')
      expect(page).to have_text(:all, 'Patient added: less than a minute ago')
    end

    it 'can edit the patient' do
      visit root_path
      find('.patient-name', text: 'Jones, Peggy, K').click

      find('i[data-attr="name"]').click
      fill_in name: 'patient[name]', with: 'Figgins, Barry, J'

      find('input[name="patient[condition]"]').click
      fill_in name: 'patient[condition]', with: 'Tonsillitis'

      expect(page).to have_text(:all, 'Figgins, Barry, J')
      expect(page).to have_text(:all, 'Tonsillitis')
    end

    it 'can archive the patient' do
      visit root_path
      find('.patient-name', text: 'Jones, Peggy, K').click

      find('button[data-target="#archiveModal"]').click
      find('button[data-test="realArchiveBtn"]').click

      expect(page).not_to have_selector('.patient-name')
    end

    it 'can complete the follow up' do
      visit root_path
      find('.patient-name', text: 'Jones, Peggy, K').click
      find('.custom-checkbox').click

      expect(page).to have_text(:all, 'Completed')
      expect(page).to have_text(:all, 'Follow up completed: less than a minute ago')
    end

    describe 'archiving and completing' do
      before do
        create(:patient, archived_at: 2.days.ago, first_name: 'Bob')
        create(:patient, follow_up_completed: true, completed_at: 5.hours.ago, first_name: 'George')
      end

      it 'shows completed and archived patients' do
        visit root_path
        click_on 'Archived'

        expect(page).to have_text(:all, 'Bob')
        expect(page).to have_text(:all, 'George')
      end
    end

    describe 'all patients' do
      before do
        create(:patient, archived_at: 2.days.ago, first_name: 'Bob')
        create(:patient, archived_at: 10.days.ago, first_name: 'Benney')
        create(:patient, follow_up_completed: true, completed_at: 17.minutes.ago, first_name: 'Patricia')
        create(:patient, follow_up_completed: true, completed_at: 5.hours.ago, first_name: 'Lucas')
        create(:patient, follow_up_completed: true, completed_at: 19.days.ago, first_name: 'George')
      end

      it 'shows all patients' do
        visit root_path
        click_on 'All'

        expect(page).to have_text(:all, 'Jones, Peggy, K')
        expect(page).to have_text(:all, 'Jones, Bob, K')
        expect(page).to have_text(:all, 'Jones, Benney, K')
        expect(page).to have_text(:all, 'Jones, Patricia, K')
        expect(page).to have_text(:all, 'Jones, Lucas, K')
        expect(page).to have_text(:all, 'Jones, George, K')
      end
    end
  end
end
