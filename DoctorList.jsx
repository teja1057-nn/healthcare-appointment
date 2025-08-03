import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const handleViewDetails = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div>
      <h2>Available Doctors</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            <img src={doctor.image} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <button onClick={() => handleViewDetails(doctor.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;

