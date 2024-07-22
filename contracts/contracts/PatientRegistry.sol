// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRegistry {
    event ConstructorCalled(address sender);

    constructor() {
        emit ConstructorCalled(msg.sender);
    }

    function testFunction() public pure returns (bool) {
        return true;
    }
}
