import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientRegistration from './components/PatientRegistration';
import HealthRecordUpload from './components/HealthRecordUpload';
import ConsentManagement from './components/ConsentManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/upload">Upload Health Record</Link>
            </li>
            <li>
              <Link to="/consent">Manage Consent</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<PatientRegistration />} />
          <Route path="/upload" element={<HealthRecordUpload />} />
          <Route path="/consent" element={<ConsentManagement />} />
          <Route path="/" element={<h1>Welcome to Health Data Exchange System</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;