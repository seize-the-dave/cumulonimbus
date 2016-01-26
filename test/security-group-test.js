var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::SecurityGroup', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup"
      });
    });
  });

  describe('GroupDescription', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setGroupDescription("Description");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup",
        "Properties": {
          "GroupDescription": "Description"
        }
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setVpcId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup",
        "Properties": {
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setVpcId("vpc-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup",
        "Properties": {
          "VpcId": "vpc-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      should.throws(function() {
        resource.setVpcId("cloud-123456");
      });
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.addTag("Name", "MySecurityGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup",
        "Properties": {
          "Tags": {
            "Name": "MySecurityGroup"
          }
        }
      });
    });
  });
});
