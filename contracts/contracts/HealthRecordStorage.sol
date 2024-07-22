// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecordStorage {
    struct HealthRecord {
        string ipfsHash;
        uint256 timestamp;
    }

    mapping(address => HealthRecord[]) private patientRecords;

    event HealthRecordAdded(address patientAddress, string ipfsHash);

    function addHealthRecord(string memory _ipfsHash) public {
        HealthRecord memory newRecord = HealthRecord({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp
        });

        patientRecords[msg.sender].push(newRecord);

        emit HealthRecordAdded(msg.sender, _ipfsHash);
    }

    function getHealthRecords(address _patientAddress) public view returns (HealthRecord[] memory) {
        return patientRecords[_patientAddress];
    }
}
