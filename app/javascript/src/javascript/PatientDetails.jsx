import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateCurrentPatients, updatePatient, removeCompletedOrArchivedPatient, setShowArchve } from './store';

const PatientModal = (props) => {
  const [patient, setPatient] = useState(props.patient);
  const dispatch = useDispatch();
  const checked = useRef(false);
  const followUpTextRef = useRef();
  const checkboxRef = useRef();
  const csrfToken = useRef(document.querySelector('meta[name="csrf-token"]').content);

  const updateFollowUpText = () => {
    if (!patient.archived_at) {
      if (checked.current) {
        followUpTextRef.current.classList.add("checkbox-checked");
      } else {
        followUpTextRef.current.classList.remove("checkbox-checked");
      }
    }
  };

  useEffect(() => {
    setPatient(props.patient);
    checked.current = props.patient.status === 'Completed';

    if (props.patient.archived_at) {
      checkboxRef.current.checked = checked.current;
    }

    updateFollowUpText();
  }, [props.patient]);

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

  const handleCheckbox = () => {
    checked.current = !checked.current;
    const updatedPatient = Object.assign({}, { ...patient, follow_up_completed: checked.current });

    fetch(`/patients/${patient.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': csrfToken.current
      },
      body: JSON.stringify(updatedPatient)
    })
      .then(response => response.json())
      .then(data => {
        updateFollowUpText();
        dispatch(removeCompletedOrArchivedPatient(data));
        dispatch(updateCurrentPatients(data));
        dispatch(updatePatient(data));
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (e) => {
    e.target.parentElement.nextElementSibling.click();
  };

  const handleInputClick = (e) => {
    const input = e.target;

    input.readOnly = false;
    input.disabled = false;
    input.focus();
  };

  const handleChange = (e) => {
    const input = e.target;
    const attr = input.dataset.attr;
    const updatedPatient = Object.assign({}, { ...patient, [attr]: input.value });
    setPatient(updatedPatient);
  };

  const handleBlur = (e) => {
    const input = e.target;

    fetch(`/patients/${patient.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': csrfToken.current
      },
      body: JSON.stringify(patient)
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updateCurrentPatients(data));
        dispatch(updatePatient(data));
      })
      .finally(() => {
        if (input.localName !== 'select') {
          input.readOnly = true;
          input.disabled = true;
        }
      })
      .catch(error => console.error(error));
  };

  const setArchive = () => {
    dispatch(setShowArchve(true));
  };

  const patientStatus = () => {
    switch (patient.status) {
      case 'Pending': {
        return <div className="small-text text-weight-light">
          Patient added: {patient.time_since_created} ago
        </div>;
      }

      case 'Completed': {
        return <div className="small-text text-weight-light">
          Follow up completed: {patient.time_since_completed} ago
        </div>;
      }

      case 'Archived': {
        return <div className="small-text text-weight-light patient-archived">
          {patient.time_since_archived} ago
        </div>;
      }
    }
  };

  const patientStatusClass = () => {
    switch (patient.status) {
      case 'Completed': {
        return 'completed';
      }

      case 'Archived': {
        return 'archived'
      }
    }
  };

  return (
    <>
      <div className="p-3">
        <>
          <strong className={`patient-status ${patientStatusClass()}`}>{patient.status}</strong>
        </>
        {patientStatus()}
      </div>
      {!patient.archived_at &&
        <div className="follow-up d-flex justify-content-end align-content-center w-100 p-3">
          <form className="form form-inline">
            <label className="custom-checkbox-label mr-2 d-flex">
              <input ref={checkboxRef} type="checkbox" name="followUp" className="follow-up-checkbox" />
              <span onClick={handleCheckbox} className="custom-checkbox"></span>
            </label>
            <span ref={followUpTextRef}>Follow up completed</span>
          </form>
        </div>
      }
      <div className="position-relative">
        <hr />
        <span className="details-heading position-absolute text-uppercase">
          <i className="fas fa-chevron-down mr-1"></i>
          Patient Details
        </span>
      </div>
      <form className="form patient-form existing p-3">
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="patient[name]">Name</label>
            <span>
              <i className="fas fa-pencil-alt" data-attr="name" onClick={handleEdit}></i>
            </span>
            <input type="text" id="patient[name]" name="patient[name]" data-attr="name" className="form-control border-bottom-0" readOnly onClick={handleInputClick} onChange={handleChange} onBlur={handleBlur} value={patient.name} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="patient[date_of_birth]">Date of Birth</label>
            <span>
              <i className="fas fa-pencil-alt" data-attr="date_of_birth" onClick={handleEdit}></i>
            </span>
            <input type="text" id="patient[date_of_birth]" name="patient[date_of_birth]" data-attr="date_of_birth" className="form-control border-bottom-0" readOnly onClick={handleInputClick} onChange={handleChange} onBlur={handleBlur} value={patient.date_of_birth} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="patient[phone_number]">Phone</label>
            <span>
              <i className="fas fa-pencil-alt" data-attr="phone_number" onClick={handleEdit}></i>
            </span>
            <input type="tel" id="patient[phone_number]" name="patient[phone_number]" data-attr="phone_number" className="form-control border-bottom-0" readOnly onClick={handleInputClick} onChange={handleChange} onBlur={handleBlur} value={patient.phone_number ? patient.phone_number : ''} />
          </div>
          <div className="form-group col">
            <label htmlFor="patient[email]">Email</label>
            <span>
              <i className="fas fa-pencil-alt" data-attr="email" onClick={handleEdit}></i>
            </span>
            <input type="email" id="patient[email]" name="patient[email]" data-attr="email" className="form-control border-bottom-0" readOnly onClick={handleInputClick} onChange={handleChange} onBlur={handleBlur} value={patient.email ? patient.email : ''} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="patient[doctors_name]">Doctor</label>
            <span>
              <i className="fas fa-pencil-alt" data-attr="doctors_name" onClick={handleEdit}></i>
            </span>
            <select type="text" id="patient[doctors_name]" name="patient[doctors_name]" data-attr="doctors_name" className="form-control" onClick={handleInputClick} onChange={handleChange} onBlur={handleBlur} value={patient.doctors_name}>
              <option value="">Select</option>
              {doctors.map((doc, index) => (
                <option key={index} value={doc}>{doc}</option>
              ))}
            </select>
          </div>
          <div className="form-group col">
            <label htmlFor="patient[condition]">Condition</label>
            <span>
              <i className="fas fa-pencil-alt" data-attr="condition" onClick={handleEdit}></i>
            </span>
            <input type="text" id="patient[condition]" name="patient[condition]" data-attr="condition" className="form-control border-bottom-0" readOnly onClick={handleInputClick} onChange={handleChange} onBlur={handleBlur} value={patient.condition} />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-outline-secondary py-1 px-4" data-dismiss="modal">Cancel</button>
          <button type="button" data-target="#archiveModal" className="btn btn-outline-danger py-1 px-4 ml-2" onClick={setArchive}>Archive</button>
        </div>
      </form>
    </>
  );
};

export default PatientModal;
