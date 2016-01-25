var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('Subnet', function() {
  describe('instantiating an empty Subnet', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.Subnet("Subnet");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet"
      });
    });
  });

  describe('setting a CIDR block', function() {
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

  describe('setting a VPC', function() {
    it('ref should be present in the JSON output', function() {
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

    it('string should be present in the JSON output', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var subnet = new cn.Ec2.Subnet("Subnet");
      subnet.setVpcId("vpc-123456");
      subnet.setCidrBlock("10.0.0.0/16");
      should(subnet.toJson()).deepEqual({
        "Type": "AWS::EC2::Subnet",
        "Properties": {
          "CidrBlock": "10.0.0.0/16",
          "VpcId": "vpc-123456"
        }
      });
    });
  });

  describe('setting a tag', function() {
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
});
