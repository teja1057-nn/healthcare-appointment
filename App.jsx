import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorList from './DoctorList';
import DoctorProfile from './DoctorProfile';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Healthcare Appointment Booking</h1>
        <Routes>
          <Route path="/" element={<DoctorList />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
