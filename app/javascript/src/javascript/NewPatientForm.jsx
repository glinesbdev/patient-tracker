import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPatient } from './store';

const NewPatientForm = () => {
  const dispatch = useDispatch();
  const formData = useRef(new FormData());
  const formRef = useRef();
  const csrfToken = useRef(document.querySelector('meta[name="csrf-token"]').content);

  const handleInput = (e) => {
    formData.current.set(e.target.name, e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    fetch('/patients.json', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': csrfToken.current
      },
      body: formData.current
    })
      .then(response => response.json())
      .then(data => {
        dispatch(addPatient(data));
        formRef.current.reset();
      })
      .catch(error => console.error(error));
  };

  const doctors = [
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
  ];

  return (
    <>
      <span className="details-heading position-absolute text-uppercase">
        <i className="fas fa-chevron-down mr-1"></i>
        Patient Details
      </span>
      <form ref={formRef} className="form patient-form p-3" onSubmit={submitForm}>
        <input type="hidden" name="authenticity_token" value={csrfToken} />

        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="firstName">Name</label>
            <input type="text" id="firstName" name="patient[first_name]" className="form-control" placeholder="First" onChange={handleInput} />
          </div>
          <div className="form-group col">
            <label className="invisible">nothing</label>
            <input type="text" id="middleInitial" name="patient[middle_initial]" className="form-control" placeholder="MI" maxLength="1" onChange={handleInput} />
          </div>
          <div className="form-group col">
            <label className="invisible">nothing</label>
            <input type="text" id="lastName" name="patient[last_name]" className="form-control" placeholder="Last" onChange={handleInput} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-4">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="text" id="dateOfBirth" name="patient[date_of_birth]" className="form-control" placeholder="00/00/0000" onChange={handleInput} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="phoneNumber">Phone</label>
            <input type="tel" id="phoneNumber" name="patient[phone_number]" className="form-control" placeholder="721-908-8090" onChange={handleInput} />
          </div>
          <div className="form-group col">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" placeholder="example@gmail.com" onChange={handleInput} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="doctorsName">Doctor</label>
            <select type="text" id="doctorsName" name="patient[doctors_name]" className="form-control" onChange={handleInput}>
              <option value="">Select</option>
              {doctors.map((doc, index) => (
                <option key={index} value={doc}>{doc}</option>
              ))}
            </select>
          </div>
          <div className="form-group col">
            <label htmlFor="condition">Condition</label>
            <input type="text" id="condition" name="patient[condition]" className="form-control" placeholder="Type here" onChange={handleInput} />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-outline-secondary py-1 px-4" data-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-outline-success py-1 px-4 ml-2">Add</button>
        </div>
      </form>
    </>
  );
};

export default NewPatientForm;
