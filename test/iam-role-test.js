var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::IAM::Role', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Iam.Role("MyRole");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Role"
      });
    });
  });

  describe('ManagedPolicyArns', function() {
    it('should accept array of strings', function() {
      var resource = new cn.Iam.Role("MyRole");
      resource.setManagedPolicyArns([
        "arn:aws:iam::123456789012:policy/teststack-CreateTestDBPolicy-16M23YE3CS700"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Role",
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
      var resource = new cn.Iam.Role("MyRole");
      resource.setPath("/role");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Role",
        "Properties": {
          "Path": "/role"
        }
      });
    });
  });

  describe('Policies', function() {
    it('should accept array of policies', function() {
      var resource = new cn.Iam.Role("MyRole");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setSid("1");
      stmt.setEffect("Allow");
      stmt.setAction("s3:*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicies([doc]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Role",
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

  describe('AssumeRolePolicyDocument', function() {
    it('should accept policy', function() {
      var resource = new cn.Iam.Role("MyRole");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setSid("1");
      stmt.setEffect("Allow");
      stmt.setAction("s3:*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setAssumeRolePolicyDocument(doc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Role",
        "Properties": {
          "AssumeRolePolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [{
              "Sid": "1",
              "Effect": "Allow",
              "Action": "s3:*",
              "Resource": "*"
            }]
          }
        }
      });
    });
  });
});
