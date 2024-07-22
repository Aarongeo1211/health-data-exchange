import React, { useState } from 'react';
import axios from 'axios';

function HealthRecordUpload() {
  const [address, setAddress] = useState('');
  const [record, setRecord] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/health-record', {
        address,
        record: JSON.parse(record)
      });
      setMessage(`Upload successful. Transaction hash: ${response.data.transactionHash}, IPFS hash: ${response.data.ipfsHash}`);
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload Health Record</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <textarea
          placeholder="Health Record (JSON format)"
          value={record}
          onChange={(e) => setRecord(e.target.value)}
          required
        />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default HealthRecordUpload;
