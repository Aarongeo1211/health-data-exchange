const express = require('express');
const cors = require('cors');
const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Update Web3 initialization
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL));

const PatientRegistry = require('../contracts/build/contracts/PatientRegistry.json');
const HealthRecordStorage = require('../contracts/build/contracts/HealthRecordStorage.json');
const ConsentManagement = require('../contracts/build/contracts/ConsentManagement.json');

const patientRegistry = new web3.eth.Contract(PatientRegistry.abi, process.env.PATIENT_REGISTRY_ADDRESS);
const healthRecordStorage = new web3.eth.Contract(HealthRecordStorage.abi, process.env.HEALTH_RECORD_STORAGE_ADDRESS);
const consentManagement = new web3.eth.Contract(ConsentManagement.abi, process.env.CONSENT_MANAGEMENT_ADDRESS);

const ipfs = ipfsClient.create({
  host: process.env.IPFS_HOST,
  port: process.env.IPFS_PORT,
  protocol: process.env.IPFS_PROTOCOL
});

app.post('/register', async (req, res) => {
    try {
        const { address, name, dateOfBirth } = req.body;
        const result = await patientRegistry.methods.registerPatient(name, dateOfBirth).send({ from: address });
        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/patient/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const patient = await patientRegistry.methods.getPatient(address).call();
        res.json({ success: true, patient });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/health-record', async (req, res) => {
    try {
        const { address, record } = req.body;
        const ipfsResult = await ipfs.add(JSON.stringify(record));
        const result = await healthRecordStorage.methods.addHealthRecord(ipfsResult.path).send({ from: address });
        res.json({ success: true, transactionHash: result.transactionHash, ipfsHash: ipfsResult.path });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/health-records/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const records = await healthRecordStorage.methods.getHealthRecords(address).call();
        res.json({ success: true, records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/consent', async (req, res) => {
    try {
        const { patientAddress, providerAddress } = req.body;
        const result = await consentManagement.methods.giveConsent(providerAddress).send({ from: patientAddress });
        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/consent', async (req, res) => {
    try {
        const { patientAddress, providerAddress } = req.body;
        const result = await consentManagement.methods.revokeConsent(providerAddress).send({ from: patientAddress });
        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/consent/:patientAddress/:providerAddress', async (req, res) => {
    try {
        const { patientAddress, providerAddress } = req.params;
        const hasConsent = await consentManagement.methods.checkConsent(patientAddress, providerAddress).call();
        res.json({ success: true, hasConsent });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));