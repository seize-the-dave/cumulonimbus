var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::VPC', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC"
      });
    });
  });

  describe('CidrBlock', function() {
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

  describe('EnableDnsHostnames', function() {
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

  describe('EnableDnsSupport', function() {
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

  describe('InstanceTenancy', function() {
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

  describe('Tags', function() {
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

  describe('validation', function() {
    it('should require CidrBlock', function() {
      var resource = new cn.Ec2.Vpc("VPC");
      resource.validate(function(err) {
        should.exist(err);
        err.message.should.containEql("CidrBlock");
      })
    });
  });
});
