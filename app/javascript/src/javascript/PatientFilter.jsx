import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPatients, setFilter } from './store';

const PatientFilter = () => {
  const dispatch = useDispatch();
  const btnGroupRef = useRef();
  const store = useSelector(state => ({
    page: state.patients.page,
    filter: state.patients.filter
  }));

  useEffect(() => {
    Array.from(btnGroupRef.current.children).forEach(el => {
      if (el.innerText.toLowerCase() === store.filter) {
        el.classList.add('active');
        return;
      }
    });
  }, [store]);

  const handleClick = (e) => {
    Array.from(btnGroupRef.current.children).forEach(el => {
      el.classList.remove('active');
    });

    e.target.classList.add('active');

    const filter = e.target.innerText.toLowerCase();
    dispatch(setFilter(filter));

    fetch(`/patients/filter/${filter}.json?page=${store.page}`)
      .then(response => response.json())
      .then(data => dispatch(setCurrentPatients(data.patients)))
      .catch(error => console.error(error));
  };

  return (
    <div className="w-100 p-2 d-flex justify-content-end filter-bar">
      <div ref={btnGroupRef} className="btn-group" role="group" aria-label="Filter buttons">
        <button type="button" onClick={handleClick} className="btn btn-light">All</button>
        <button type="button" onClick={handleClick} className="btn btn-light">Archived</button>
        <button type="button" onClick={handleClick} className="btn btn-light">Pending</button>
      </div>
    </div>
  );
};

export default PatientFilter;
