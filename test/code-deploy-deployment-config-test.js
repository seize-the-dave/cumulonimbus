var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::CodeDeploy::DeploymentConfig', function() {
  describe('Constructor', function() {
    it('should output correct format', function() {
      var resource = new cn.CodeDeploy.DeploymentConfig("MyDeploymentConfig");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentConfig"
      });
    });
  });

  describe('DeploymentConfigName', function() {
    it('should accept a string', function() {
      var resource = new cn.CodeDeploy.DeploymentConfig("MyDeploymentConfig");
      resource.setDeploymentConfigName("Example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentConfig",
        "Properties": {
          "DeploymentConfigName": "Example"
        }
      });
    });
  });

  describe('MinimumHealthyHosts', function() {
    it('should accept an object', function() {
      var resource = new cn.CodeDeploy.DeploymentConfig("MyDeploymentConfig");
      var hosts = new cn.CodeDeploy.DeploymentConfig.MinimumHealthyHosts();
      hosts.setType("FLEET_PERCENT");
      hosts.setValue(50);
      resource.setMinimumHealthyHosts(hosts);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentConfig",
        "Properties": {
          "MinimumHealthyHosts": {
            "Type": "FLEET_PERCENT",
            "Value": 50
          }
        }
      });
    });
  });
});
