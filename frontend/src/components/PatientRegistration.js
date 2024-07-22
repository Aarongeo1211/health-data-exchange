import React, { useState } from 'react';
import axios from 'axios';

function PatientRegistration() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        address,
        name,
        dateOfBirth: new Date(dateOfBirth).getTime() / 1000
      });
      setMessage(`Registration successful. Transaction hash: ${response.data.transactionHash}`);
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PatientRegistration;
