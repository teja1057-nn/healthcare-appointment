const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Load doctors data
const doctors = require('./data.json');

// Load appointments data (create if it doesn't exist)
const appointmentsFile = path.join(__dirname, 'appointments.json');
let appointments = [];

if (fs.existsSync(appointmentsFile)) {
  appointments = JSON.parse(fs.readFileSync(appointmentsFile, 'utf8'));
}

// Get all doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Get a specific doctor by ID
app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

// Create a new appointment
app.post('/api/appointments', (req, res) => {
  const { doctorId, doctorName, patientName, patientEmail, appointmentDate } = req.body;
  
  // Validate required fields
  if (!doctorId || !doctorName || !patientName || !patientEmail || !appointmentDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Create new appointment
  const newAppointment = {
    id: appointments.length + 1,
    doctorId,
    doctorName,
    patientName,
    patientEmail,
    appointmentDate,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  // Add to appointments array
  appointments.push(newAppointment);
  
  // Save to file
  try {
    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
  } catch (error) {
    console.error('Error saving appointment:', error);
  }
  
  res.status(201).json(newAppointment);
});

// Get all appointments
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
