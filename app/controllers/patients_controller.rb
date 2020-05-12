# frozen_string_literal: true

class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :edit, :update, :destroy]

  # GET /patients
  # GET /patients.json
  def index
  end

  def search
    @patients = Patient.where(
      'first_name ILIKE :search OR last_name ILIKE :search OR doctors_name ILIKE :search OR condition ILIKE :search',
      search: "%#{other_params[:q]}%"
    )

    render :index
  end

  def filter
    @filter = other_params[:filter]
    @page = other_params[:page].to_i || 0

    case @filter
    when 'pending' then @patients = Patient.where(follow_up_completed: false, archived_at: nil)
    when 'archived'
      @patients = Patient.where(follow_up_completed: true)
                         .or(Patient.where.not(archived_at: nil))
                         .order(follow_up_completed: :desc)
    when 'all' then @patients = Patient.all.order(follow_up_completed: :desc)
    else @patients = Patient.where(follow_up_completed: false, archived_at: nil)
    end

    setup_pagination

    @patients = @patients.order(follow_up_completed: :asc, first_name: :asc)
                         .limit(@page_limit)
                         .offset(@page * @page_limit)

    render :index
  end

  # GET /patients/1
  # GET /patients/1.json
  def show
    respond_to do |format|
      format.json { render :show }
      format.html {}
    end
  end

  # GET /patients/new
  def new
    @patient = Patient.new
  end

  # GET /patients/1/edit
  def edit
  end

  # POST /patients
  # POST /patients.json
  def create
    @patient = Patient.new(patient_params)

    respond_to do |format|
      if @patient.save
        format.html do
          redirect_to controller: :home, action: :index
          flash[:notice] = 'Patient was successfully created.'
        end
        format.json { render :show, status: :created, location: @patient }
      else
        format.html do
          redirect_to controller: :home, action: :index
          flash[:alert] = @patient.errors.full_messages
        end
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patients/1
  # PATCH/PUT /patients/1.json
  def update
    respond_to do |format|
      updated_attrs = {}

      if params[:name]
        name = params[:name].split(',')
        updated_attrs[:first_name] = name[1].strip
        updated_attrs[:last_name] = name[0].strip
        updated_attrs[:middle_initial] = name[2]
      end

      updated_attrs[:completed_at] = Time.now if params[:follow_up_completed]

      if @patient.update(patient_params.merge(updated_attrs))
        format.html { redirect_to @patient, notice: 'Patient was successfully updated.' }
        format.json { render :show, status: :ok, location: @patient }
      else
        format.html { render :edit }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patients/1
  # DELETE /patients/1.json
  def destroy
    @patient.update_attribute(:archived_at, Time.now)
    respond_to do |format|
      format.html { redirect_to patients_url, notice: 'Patient was successfully archived.' }
      format.json { render :show }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_patient
    @patient = Patient.find(params[:id])
  end

  def other_params
    params.permit(:page, :q, :filter, :format)
  end

  # Only allow a list of trusted parameters through.
  def patient_params
    params.require(:patient).permit(:first_name, :middle_initial, :last_name, :name, :date_of_birth, :email, :phone_number, :doctors_name, :condition, :follow_up_completed)
  end

  def setup_pagination
    @page = other_params[:page].to_i || 0
    @page_limit = 20
    @total_patients = @patients.load.size
    @total_pages = (@total_patients.to_f / @page_limit).ceil
    @prev_page = @page.zero? ? 0 : @page - 1
    @next_page = @page == @total_pages ? @total_pages : @page + 1
    @count_start = @page_limit * @page + 1
    @count_end = @page_limit * (@page + 1)
    @count_end = @total_patients if @count_end > @total_patients
  end
end
