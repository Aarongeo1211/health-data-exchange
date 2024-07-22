// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConsentManagement {
    mapping(address => mapping(address => bool)) private consents;

    event ConsentGiven(address patientAddress, address providerAddress);
    event ConsentRevoked(address patientAddress, address providerAddress);

    function giveConsent(address _providerAddress) public {
        consents[msg.sender][_providerAddress] = true;
        emit ConsentGiven(msg.sender, _providerAddress);
    }

    function revokeConsent(address _providerAddress) public {
        consents[msg.sender][_providerAddress] = false;
        emit ConsentRevoked(msg.sender, _providerAddress);
    }

    function checkConsent(address _patientAddress, address _providerAddress) public view returns (bool) {
        return consents[_patientAddress][_providerAddress];
    }
}
