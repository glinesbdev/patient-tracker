// Run this example by adding <%= javascript_pack_tag 'PatientTable' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPatients, setModalPatient, setPage } from './store';
import ArchiveModal from './ArchiveModal';

const PatientTable = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => ({
    patients: state.patients.search.length > 0 ? state.patients.search : state.patients.current,
    page: state.patients.page,
    filter: state.patients.filter
  }));
  const [pagination, setPagination] = useState({});

  const fetchPatients = (pageNum) => {
    fetch(`/patients/filter/${store.filter}.json?page=${pageNum}`)
      .then(response => response.json())
      .then(data => {
        setPagination(data.pagination);
        dispatch(setCurrentPatients(data.patients));
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchPatients(store.page);
  }, [dispatch]);

  const changePage = (e) => {
    const newPage = Number(e.target.innerText) - 1;
    fetchPatients(newPage);
    dispatch(setPage(newPage));
  };

  const handleModalPatient = (e) => {
    const id = e.target.dataset.id;
    fetch(`/patients/${id}.json`)
      .then(response => response.json())
      .then(data => dispatch(setModalPatient({ patient: data, mode: 'detail' })))
      .catch(error => console.error(error));
  };

  return (
    <div className="min-vh-75">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-uppercase">Name</th>
              <th className="text-uppercase text-center">E-Mail</th>
              <th className="text-uppercase text-center">Phone</th>
              <th className="text-uppercase">Doctor</th>
              <th className="text-uppercase">Condition</th>
              <th className="text-uppercase">Follow Up</th>
            </tr>
          </thead>
          <tbody>
            {store.patients && store.patients.map((patient, index) => (
              <tr key={index}>
                <td className="patient-name" data-toggle="modal" data-target="#patientModal" data-id={patient.id} onClick={handleModalPatient}>{patient.name}</td>
                <td className="contact-field pl-6">{patient.email}</td>
                <td className="contact-field text-center">{patient.phone_number}</td>
                <td>{patient.doctors_name}</td>
                <td>{patient.condition}</td>
                <td>{patient.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ArchiveModal />

      {pagination &&
        <div className="d-flex justify-content-between align-content-center px-3 row">
          <p>Displaying {pagination.count_start} - {pagination.count_end} of {pagination.total_patients}</p>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${store.page == 0 ? 'disabled' : ''}`}>
                <button type="button" className="page-link">
                  <i className="fas fa-chevron-left"></i>
                </button>
              </li>
              {Array(pagination.total_pages).fill().map((_num, index) => (
                <li key={index} className={`page-item ${store.page == index ? 'active' : ''}`}>
                  <button type="button" className="page-link" onClick={changePage}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${store.page == pagination.totalPages - 1 ? 'disabled' : ''}`}>
                <button type="button" className="page-link">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      }
    </div>
  );
}

export default PatientTable;
