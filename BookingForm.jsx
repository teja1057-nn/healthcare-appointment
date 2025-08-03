import React, { useState } from 'react';

const BookingForm = ({ doctorId, doctorName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare appointment data
    const appointmentData = {
      doctorId,
      doctorName,
      patientName: name,
      patientEmail: email,
      appointmentDate: date,
      status: 'confirmed'
    };

    // Send appointment data to backend
    fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    })
    .then(response => response.json())
    .then(data => {
      setMessage('Appointment booked successfully!');
      // Reset form
      setName('');
      setEmail('');
      setDate('');
    })
    .catch(error => {
      console.error('Error booking appointment:', error);
      setMessage('Error booking appointment. Please try again.');
    });
  };

  return (
    <div>
      <h3>Book Appointment with Dr. {doctorName}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Patient Name" 
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
        </div>
        <div>
          <input 
            type="datetime-local" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
