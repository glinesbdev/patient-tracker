import React from 'react'
import { useSelector } from 'react-redux'
import NewPatientForm from './NewPatientForm';
import PatientDetails from './PatientDetails';
import avatarPlaceholder from '../images/avatar_placeholder.png';

const PatientModal = () => {
  const modal = useSelector(state => ({
    mode: state.modal.mode,
    patient: state.modal.patient
  }));

  return (
    <div className="patient-modal modal fade position-absolute" id="patientModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {modal && modal.mode === 'new' ?
              <h3 className="modal-title">
                <i className="fas fa-user-plus"></i>
                Add Patient
              </h3> :
              <>
                <div className="d-flex">
                  <img src={avatarPlaceholder} className="rounded-circle mr-2" width="50" height="50" alt="Avatar Image" />
                  <div className="flex-row">
                    <div>
                      <strong>{modal.patient.name}</strong>
                    </div>
                    <div className="small-text text-weight-light">
                      <span dangerouslySetInnerHTML={
                        { __html: `${modal.patient.doctors_name} &middot; ${modal.patient.condition}` }
                      } />
                    </div>
                    <div className="small-text">
                      {modal.patient.phone_number &&
                        <>
                          <i className="fas fa-phone-alt pr-1"></i>
                          <a className="mr-2" href={`tel+${modal.patient.phone_number.replace(/-/g, '')}`}>{modal.patient.phone_number}</a>
                        </>
                      }
                      {modal.patient.email &&
                        <>
                          <i className="fas fa-envelope pr-1"></i>
                          <a href={`mailto:${modal.patient.email}`}>{modal.patient.email}</a>
                        </>
                      }
                    </div>
                  </div>
                </div>
                <hr />
              </>
            }
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {modal && modal.mode === 'new' ? <NewPatientForm /> : <PatientDetails patient={modal.patient} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
