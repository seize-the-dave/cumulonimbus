var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::IAM::ManagedPolicy', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::ManagedPolicy"
      });
    });
  });

  describe('Description', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      resource.setDescription("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::ManagedPolicy",
        "Properties": {
          "Description": "example"
        }
      });
    });
  });

  describe('Path', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      resource.setPath("/");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::ManagedPolicy",
        "Properties": {
          "Path": "/"
        }
      });
    });
  });

  describe('PolicyDocument', function() {
    it('should accept instance', function() {
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setSid("1");
      stmt.setEffect("Allow");
      stmt.setAction("s3:*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicyDocument(doc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::ManagedPolicy",
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
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      resource.setGroups([
        "mystack-mygroup-1DZETITOWEKVO"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::ManagedPolicy",
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
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      resource.setUsers([
        "mystack-myuser-1CCXAFG2H2U4D"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::ManagedPolicy",
        "Properties": {
          "Users": [
            "mystack-myuser-1CCXAFG2H2U4D"
          ]
        }
      });
    });
  });

  describe('validate', function() {
    it('should fail without PolicyDocument', function() {
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      resource.setUsers([
        "mystack-myuser-1CCXAFG2H2U4D"
      ]);
      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("PolicyDocument");
    });

    it('should pass with all valid fields', function() {
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setSid("1");
      stmt.setEffect("Allow");
      stmt.setAction("s3:*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicyDocument(doc);

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.not.exist(actual);
    });
  });

  describe('Roles', function() {
    it('should accept string array', function() {
      var resource = new cn.Iam.ManagedPolicy("MyManagedPolicy");
      resource.setRoles([
        "MyRole-AJJHDSKSDF"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::ManagedPolicy",
        "Properties": {
          "Roles": [
            "MyRole-AJJHDSKSDF"
          ]
        }
      });
    });
  });
});
