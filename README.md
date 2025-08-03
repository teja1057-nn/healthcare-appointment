# Healthcare Appointment Booking System

## Project Structure
- `client/` - Frontend React application
  - `public/` - Static assets
  - `src/` - Source code
    - `components/` - React components
- `server/` - Backend Node.js/Express server
  - `server.js` - Main server file
  - `data.json` - Sample data
  - `package.json` - Server dependencies

## Features
- View list of available doctors
- View doctor profiles
- Book appointments with doctors
- RESTful API for doctors and appointments

## Setup Instructions

1. Install server dependencies:
   ```
   cd server
   npm install
   ```

2. Install client dependencies:
   ```
   cd client/public
   npm install
   ```

3. Start the server:
   ```
   cd server
   npm start
   ```

4. In a new terminal, start the client:
   ```
   cd client/public
   npm start
   ```

The application will be available at:
- Client: http://localhost:3000
- Server: http://localhost:5000
