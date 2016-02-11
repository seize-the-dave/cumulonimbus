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
});
