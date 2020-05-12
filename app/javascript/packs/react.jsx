import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from '../src/javascript/store';
import PatientTable from '../src/javascript/PatientTable';
import PatientSearch from '../src/javascript/PatientSearch';
import PatientFilter from '../src/javascript/PatientFilter';
import PatientModal from '../src/javascript/PatientModal';

import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  const patientTableEl = document.querySelector('#patientTableEl');
  const patientSearchEl = document.querySelector('#patientSearchEl');
  const patientFilterEl = document.querySelector('#patientFilterEl');
  const patientModalEl = document.querySelector('#patientModalEl');


  if (patientTableEl) {
    ReactDOM.render(
      <Provider store={store}>
        <PatientTable />
      </Provider>,
      patientTableEl,
    );

    ReactDOM.render(
      <Provider store={store}>
        <PatientSearch />
      </Provider>,
      patientSearchEl,
    );

    ReactDOM.render(
      <Provider store={store}>
        <PatientFilter />
      </Provider>,
      patientFilterEl
    );

    ReactDOM.render(
      <Provider store={store}>
        <PatientModal />
      </Provider>,
      patientModalEl,
    );
  }
});
