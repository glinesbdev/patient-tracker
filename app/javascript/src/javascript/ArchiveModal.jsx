import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowArchve, removeCompletedOrArchivedPatient, updatePatient } from './store';

const ArchiveModal = () => {
  const dispatch = useDispatch();
  const patient = useSelector(state => state.modal.patient);
  const csrfToken = useRef(document.querySelector('meta[name="csrf-token"]').content);

  const show = useSelector(state => state.modal.showArchive);

  const handleArchive = () => {
    fetch(`/patients/${patient.id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': csrfToken.current
      },
      body: JSON.stringify(patient)
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updatePatient(data));
        dispatch(removeCompletedOrArchivedPatient(data));
        dispatch(setShowArchve(false));
      })
      .catch(error => console.error(error));
  };

  const cancelArchive = () => {
    dispatch(setShowArchve(false));
  };

  return (
    <div className={`archive-modal ${show ? 'd-block' : 'd-none'}`}>
      <h5 className="modal-title">Confirm Archive?</h5>
      <div className="modal-body mt-3">
        <p className="text-weight-light">This will archive the patient from this worklist. The patient record can be found in the archived patient list.</p>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary" onClick={cancelArchive}>Cancel</button>
          <button type="button" className="btn btn-danger ml-2" data-dismiss="modal" data-test="realArchiveBtn" onClick={handleArchive}>Archive</button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;
