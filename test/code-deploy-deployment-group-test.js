var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::CodeDeploy::DeploymentGroup', function() {
  describe('Constructor', function() {
    it('should output correct format', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup"
      });
    });
  });

  describe('ApplicationName', function() {
    it('should accept a string', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      resource.setApplicationName("Example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "ApplicationName": "Example"
        }
      });
    });

    it('should accept an object', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      var application = new cn.CodeDeploy.Application("MyApplication");
      resource.setApplicationName(application);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "ApplicationName": {
            "Ref": "MyApplication"
          }
        }
      });
    });
  });

  describe('Deployment', function() {
    it('should accept an object', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      var deployment = new cn.CodeDeploy.DeploymentGroup.Deployment();
      deployment.setDescription("MyDeployment");
      deployment.ignoreApplicationStopFailures(false);
      var revision = new cn.CodeDeploy.DeploymentGroup.Deployment.Revision();
      revision.setRevisionType("S3");
      var s3Location = new cn.CodeDeploy.DeploymentGroup.Deployment.Revision.S3Location();
      s3Location.setBucket("example-bucket");
      s3Location.setBundleType("zip");
      s3Location.setETag("982bae6f1f3a3e42478918f7d5f0b470-3");
      s3Location.setKey("application.zip");
      s3Location.setVersion("12");
      revision.setS3Location(s3Location);
      deployment.setRevision(revision);
      resource.setDeployment(deployment);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "Deployment": {
            "Description": "MyDeployment",
            "IgnoreApplicationStopFailures": false,
            "Revision": {
              "RevisionType": "S3",
              "S3Location": {
                "Bucket": "example-bucket",
                "BundleType": "zip",
                "ETag": "982bae6f1f3a3e42478918f7d5f0b470-3",
                "Key": "application.zip",
                "Version": "12"
              }
            }
          }
        }
      });
    });
  });

  describe('DeploymentGroupName', function() {
    it('should accept a string', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      resource.setDeploymentGroupName("Example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "DeploymentGroupName": "Example"
        }
      });
    });
  });

  describe('Ec2TagFilters', function() {
    it('should accept a list of objects', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      var filter = new cn.CodeDeploy.DeploymentGroup.Ec2TagFilters();
      filter.setKey("key");
      filter.setValue("value");
      filter.setType("KEY_AND_VALUE");
      resource.setEc2TagFilters([filter]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "Ec2TagFilters": [
            {
              "Key": "key",
              "Value": "value",
              "Type": "KEY_AND_VALUE"
            }
          ]
        }
      });
    });
  });

  describe('DeploymentConfigName', function() {
    it('should accept a string', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      resource.setDeploymentConfigName("Example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "DeploymentConfigName": "Example"
        }
      });
    });

    it('should accept an object', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      var config = new cn.CodeDeploy.DeploymentConfig("MyDeploymentConfig");
      resource.setDeploymentConfigName(config);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "DeploymentConfigName": {
            "Ref": "MyDeploymentConfig"
          }
        }
      });
    });
  });

  describe('ServiceRoleArn', function() {
    it('should accept a string', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      resource.setServiceRoleArn("arn:aws:iam::306252214413:role/example-CodeDeployRole-1DL3NLF7KU5MQ");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "ServiceRoleArn": "arn:aws:iam::306252214413:role/example-CodeDeployRole-1DL3NLF7KU5MQ"
        }
      });
    });

    it('should accept an object', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      var role = new cn.Iam.Role("MyRole");
      resource.setServiceRoleArn(role);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::DeploymentGroup",
        "Properties": {
          "ServiceRoleArn": {
            "Fn::GetAtt": ["MyRole", "Arn"]
          }
        }
      });
    });

    it('should reject an invalid string', function() {
      var resource = new cn.CodeDeploy.DeploymentGroup("MyDeploymentGroup");
      should(function() {
        resource.setServiceRoleArn("arn:aws:ian::306252214413:role/example-CodeDeployRole-1DL3NLF7KU5MQ");
      }).throw(/Invalid ARN/);
    });
  });
});
