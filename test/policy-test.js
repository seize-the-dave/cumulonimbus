var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::IAM::Policy', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Iam.Policy("MyPolicy");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Policy"
      });
    });
  });

  describe('PolicyName', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.Policy("MyPolicy");
      resource.setPolicyName("Example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Policy",
        "Properties": {
          "PolicyName": "Example"
        }
      });
    });
  });

  describe('PolicyDocument', function() {
    it('should accept instance', function() {
      var resource = new cn.Iam.Policy("MyPolicy");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setSid("1");
      stmt.setEffect("Allow");
      stmt.setAction("s3:*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicyDocument(doc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Policy",
        "Properties": {
          "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
              {
                "Sid": "1",
                "Effect": "Allow",
                "Action": "s3:*",
                "Resource": "*"
              }
            ]
          }
        }
      });
    });
  });

  describe('Groups', function() {
    it('should accept string array', function() {
      var resource = new cn.Iam.Policy("MyPolicy");
      resource.setGroups([
        "mystack-mygroup-1DZETITOWEKVO"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Policy",
        "Properties": {
          "Groups": [
            "mystack-mygroup-1DZETITOWEKVO"
          ]
        }
      });
    });
  });

  describe('Users', function() {
    it('should accept string array', function() {
      var resource = new cn.Iam.Policy("MyPolicy");
      resource.setUsers([
        "mystack-myuser-1CCXAFG2H2U4D"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Policy",
        "Properties": {
          "Users": [
            "mystack-myuser-1CCXAFG2H2U4D"
          ]
        }
      });
    });
  });

  describe('Roles', function() {
    it('should accept string array', function() {
      var resource = new cn.Iam.Policy("MyPolicy");
      resource.setRoles([
        "MyRole-AJJHDSKSDF"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::Policy",
        "Properties": {
          "Roles": [
            "MyRole-AJJHDSKSDF"
          ]
        }
      });
    });
  });
});
