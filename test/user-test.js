var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::IAM::User', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Iam.User("MyUser");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::User"
      });
    });
  });

  describe('ManagedPolicyArns', function() {
    it('should accept array of strings', function() {
      var resource = new cn.Iam.User("MyUser");
      resource.setManagedPolicyArns([
        "arn:aws:iam::123456789012:policy/teststack-CreateTestDBPolicy-16M23YE3CS700"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::User",
        "Properties": {
          "ManagedPolicyArns": [
            "arn:aws:iam::123456789012:policy/teststack-CreateTestDBPolicy-16M23YE3CS700"
          ]
        }
      });
    });
  });

  describe('Path', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.User("MyUser");
      resource.setPath("/fred");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::User",
        "Properties": {
          "Path": "/fred"
        }
      });
    });
  });

  describe('Groups', function() {
    it('should accept string array', function() {
      var resource = new cn.Iam.User("MyUser");
      resource.setGroups([
        "mystack-mygroup-1DZETITOWEKVO"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::User",
        "Properties": {
          "Groups": [
            "mystack-mygroup-1DZETITOWEKVO"
          ]
        }
      });
    });
  });

  describe('LoginProfile', function() {
    it('should accept instance', function() {
      var resource = new cn.Iam.User("MyUser");
      var profile = new cn.Iam.User.LoginProfile();
      resource.setLoginProfile(profile);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::User",
        "Properties": {
          "LoginProfile": {}
        }
      });
    });
    describe('Password', function() {
      it('should accept string', function() {
        var resource = new cn.Iam.User("MyUser");
        var profile = new cn.Iam.User.LoginProfile();
        profile.setPassword("top-secret");
        resource.setLoginProfile(profile);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::IAM::User",
          "Properties": {
            "LoginProfile": {
              "Password": "top-secret"
            }
          }
        });
      });
    });
    describe('PasswordResetRequired', function() {
      it('should accept boolean', function() {
        var resource = new cn.Iam.User("MyUser");
        var profile = new cn.Iam.User.LoginProfile();
        profile.setPasswordResetRequired("true");
        resource.setLoginProfile(profile);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::IAM::User",
          "Properties": {
            "LoginProfile": {
              "PasswordResetRequired": "true"
            }
          }
        });
      });
    });
  });

  describe('Policies', function() {
    it('should accept array of policies', function() {
      var resource = new cn.Iam.User("MyUser");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setSid("1");
      stmt.setEffect("Allow");
      stmt.setAction("s3:*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicies([doc]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::User",
        "Properties": {
          "Policies": [{
            "Version": "2012-10-17",
            "Statement": [{
              "Sid": "1",
              "Effect": "Allow",
              "Action": "s3:*",
              "Resource": "*"
            }]
          }]
        }
      });
    });
  });
});
