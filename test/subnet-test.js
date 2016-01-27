var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::EC2::Subnet', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet"
      });
    });
  });

  describe('CidrBlock', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      resource.setCidrBlock("10.0.0.0/16");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet",
        "Properties": {
          "CidrBlock": "10.0.0.0/16"
        }
      });
    });
  });

  describe('AvailabilityZone', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      resource.setAvailabilityZone("us-east-1a");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet",
        "Properties": {
          "AvailabilityZone": "us-east-1a"
        }
      });
    });
  });

  describe('MapPublicIpOnLaunch', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      resource.mapPublicIpOnLaunch(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet",
        "Properties": {
          "MapPublicIpOnLaunch": true
        }
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var subnet = new cn.Ec2.Subnet("Subnet");
      subnet.setVpcId(vpc);
      subnet.setCidrBlock("10.0.0.0/16");
      should(subnet.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet",
        "Properties": {
          "CidrBlock": "10.0.0.0/16",
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var subnet = new cn.Ec2.Subnet("Subnet");
      subnet.setVpcId("vpc-12345678");
      subnet.setCidrBlock("10.0.0.0/16");
      should(subnet.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet",
        "Properties": {
          "CidrBlock": "10.0.0.0/16",
          "VpcId": "vpc-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var subnet = new cn.Ec2.Subnet("Subnet");
      should.throws(function() {
        subnet.setVpcId("cloud-123456");
      });
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      resource.addTag("Name", "Subnet");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet",
        "Properties": {
          "Tags": {
            "Name": "Subnet"
          }
        }
      });
    });
  });

  describe('validation', function() {
    it('should require CidrBlock', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      resource.setVpcId("vpc-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("CidrBlock");
    });

    it('should require VpcId', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      resource.setCidrBlock("10.0.0.0/16");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("VpcId");
    });
  });
});
