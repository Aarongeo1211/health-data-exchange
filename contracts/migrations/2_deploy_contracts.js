const PatientRegistry = artifacts.require("PatientRegistry");
const HealthRecordStorage = artifacts.require("HealthRecordStorage");
const ConsentManagement = artifacts.require("ConsentManagement");

module.exports = function(deployer) {
  deployer.deploy(PatientRegistry);
  deployer.deploy(HealthRecordStorage);
  deployer.deploy(ConsentManagement);
};
