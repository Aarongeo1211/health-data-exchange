import React, { useState } from 'react';
import axios from 'axios';

function ConsentManagement() {
  const [patientAddress, setPatientAddress] = useState('');
  const [providerAddress, setProviderAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleGiveConsent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/consent', {
        patientAddress,
        providerAddress
      });
      setMessage(`Consent given. Transaction hash: ${response.data.transactionHash}`);
    } catch (error) {
      setMessage(`Failed to give consent: ${error.message}`);
    }
  };

  const handleRevokeConsent = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/consent', {
        data: { patientAddress, providerAddress }
      });
      setMessage(`Consent revoked. Transaction hash: ${response.data.transactionHash}`);
    } catch (error) {
      setMessage(`Failed to revoke consent: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Consent Management</h2>
      <input
        type="text"
        placeholder="Patient Ethereum Address"
        value={patientAddress}
        onChange={(e) => setPatientAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Provider Ethereum Address"
        value={providerAddress}
        onChange={(e) => setProviderAddress(e.target.value)}
      />
      <button onClick={handleGiveConsent}>Give Consent</button>
      <button onClick={handleRevokeConsent}>Revoke Consent</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ConsentManagement;
