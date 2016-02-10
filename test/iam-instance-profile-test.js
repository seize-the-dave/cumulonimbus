var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::IAM::InstanceProfile', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Iam.InstanceProfile("MyInstanceProfile");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::InstanceProfile"
      });
    });
  });

  describe('Path', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.InstanceProfile("MyInstanceProfile");
      resource.setPath("/");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::InstanceProfile",
        "Properties": {
          "Path": "/"
        }
      });
    });
  });

  describe('Roles', function() {
    it('should accept string array', function() {
      var resource = new cn.Iam.InstanceProfile("MyInstanceProfile");
      resource.setRoles([
        "MyRole-AJJHDSKSDF"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::InstanceProfile",
        "Properties": {
          "Roles": [
            "MyRole-AJJHDSKSDF"
          ]
        }
      });
    });

    it('should accept string', function() {
      var resource = new cn.Iam.InstanceProfile("MyInstanceProfile");
      resource.setRoles("MyRole-AJJHDSKSDF");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::InstanceProfile",
        "Properties": {
          "Roles": [
            "MyRole-AJJHDSKSDF"
          ]
        }
      });
    });

    it('should accept single reference', function() {
      var resource = new cn.Iam.InstanceProfile("MyInstanceProfile");
      var role = new cn.Iam.Role("MyRole");
      resource.setRoles(role);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::InstanceProfile",
        "Properties": {
          "Roles": [
            {
              "Ref": "MyRole"
            }
          ]
        }
      });
    });

    it('should accept array reference', function() {
      var resource = new cn.Iam.InstanceProfile("MyInstanceProfile");
      var role = new cn.Iam.Role("MyRole");
      resource.setRoles([role]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::InstanceProfile",
        "Properties": {
          "Roles": [
            {
              "Ref": "MyRole"
            }
          ]
        }
      });
    });
  });
});
