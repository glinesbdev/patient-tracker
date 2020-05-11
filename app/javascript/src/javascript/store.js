import {configureStore, createSlice} from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patients',
  initialState: {current: [], search: [], page: 0, filter: 'pending'},
  reducers: {
    addPatient(state, action) {
      return Object.assign(
          state, {current: [action.payload, ...state.current]});
    },
    setCurrentPatients(state, action) {
      return Object.assign(state, {current: action.payload});
    },
    setSearchPatients(state, action) {
      return Object.assign(state, {search: action.payload});
    },
    setPage(state, action) {
      return Object.assign(state, {page: action.payload});
    },
    setFilter(state, action) {
      return Object.assign(state, {filter: action.payload});
    },
    updateCurrentPatients(state, action) {
      state.current.forEach((patient, index) => {
        if (patient.id === action.payload.id) {
          state.current[index] = action.payload;
          return;
        }
      });

      return Object.assign(state, {current: state.current});
    },
    removeCompletedOrArchivedPatient(state, action) {
      const current = state.current.filter(patient => {
        if (action.payload.follow_up_completed || action.payload.archived_at) {
          return patient.id !== action.payload.id;
        }

        return patient;
      });

      return Object.assign(state, {current});
    }
  }
});

const modalSlice = createSlice({
  name: 'modal',
  initialState: {patient: {}, mode: 'new', showArchive: false},
  reducers: {
    setModalPatient(state, action) {
      return Object.assign(state, action.payload);
    },
    setShowArchve(state, action) {
      return Object.assign(state, {showArchive: action.payload});
    },
    updatePatient(state, action) {
      return Object.assign(state, {patient: action.payload});
    }
  }
});

const store = configureStore(
    {reducer: {patients: patientSlice.reducer, modal: modalSlice.reducer}});

export default store;
export const {
  addPatient,
  setCurrentPatients,
  setSearchPatients,
  setPage,
  setFilter,
  updateCurrentPatients,
  removeCompletedOrArchivedPatient
} = patientSlice.actions;
export const {setModalPatient, setShowArchve, updatePatient} =
    modalSlice.actions;
