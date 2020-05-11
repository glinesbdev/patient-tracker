// Run this example by adding <%= javascript_pack_tag 'PatientSearch' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchPatients, setModalPatient } from './store';

const PatientSearch = () => {
  const searchRef = useRef();
  const dispatch = useDispatch();

  const search = (e) => {
    e.preventDefault();

    if (e.target.value.length >= 3) {
      fetch(`/patients/search/${e.target.value}.json`)
        .then(response => response.json())
        .then(data => dispatch(setSearchPatients(data.patients)))
        .catch(error => console.error(error));
    }

    if (e.target.value.length <= 2) {
      dispatch(setSearchPatients([]));
    }
  };

  const handleSetModal = () => {
    dispatch(setModalPatient({ patient: {}, mode: 'new' }));
  };

  return (
    <div className="w-100 d-flex p-3 justify-content-between search-area">
      <button type="button" data-toggle="modal" data-target="#patientModal" onClick={handleSetModal} className="btn btn-outline-primary add-patient-btn px-3 py-1">
        <i className="fas fa-user-plus"></i>
        <span>Add Patient</span>
      </button>
      <form className="form-inline position-relative search-bar">
        <input ref={searchRef} onChange={search} className="form-control border-0" type="search" placeholder="Search for patient, doctor, or condition..." aria-label="Search" />
        <i className="fas fa-search position-absolute"></i>
      </form>
    </div>
  );
};

export default PatientSearch;
