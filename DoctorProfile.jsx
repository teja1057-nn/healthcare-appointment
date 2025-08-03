import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/doctors/${id}`)
      .then(response => response.json())
      .then(data => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div>
      <h2>Doctor Profile</h2>
      <div>
        <img src={doctor.image} alt={doctor.name} />
        <h3>{doctor.name}</h3>
        <p>Specialization: {doctor.specialization}</p>
        <p>Status: {doctor.availability ? 'Available' : 'Not Available'}</p>
      </div>
      <h3>Book an Appointment</h3>
      <BookingForm doctorId={id} doctorName={doctor.name} />
    </div>
  );
};

export default DoctorProfile;

