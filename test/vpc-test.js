var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('VPC', function() {
  describe('instantiating an empty VPC', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC"
      });
    });
  });

  describe('setting a CIDR block', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      resource.setCidrBlock("10.0.0.0/24");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "CidrBlock": "10.0.0.0/24"
        }
      });
    });
  });

  describe('enabling DNS hostnames', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      resource.enableDnsHostnames(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "EnableDnsHostnames": true
        }
      });
    });
  });

  describe('enabling DNS support', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      resource.enableDnsSupport(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "EnableDnsSupport": true
        }
      });
    });
  });

  describe('setting instance tenancy', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      resource.setInstanceTenancy("dedicated");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "InstanceTenancy": "dedicated"
        }
      });
    });
  });

  describe('setting a tag', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      resource.addTag("Name", "VPC");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "Tags": {
            "Name": "VPC"
          }
        }
      });
    });
  });
});
