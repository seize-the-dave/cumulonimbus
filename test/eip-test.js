var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::EC2::EIP', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.Eip("MyElasticIP");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIP"
      });
    });
  });

  describe('Domain', function() {
    it('should accept vpc', function() {
      var resource = new cn.Ec2.Eip("MyElasticIP");
      resource.setDomain("vpc");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIP",
        "Properties": {
          "Domain": "vpc"
        }
      });
    });
    it('should rejected invalid values', function() {
      var resource = new cn.Ec2.Eip("MyElasticIP");
      should.throws(function() {
        resource.setDomain("example");
      });
    });
  });

  describe('InstanceId', function() {
    it('should accept reference', function() {
      var resource = new cn.Ec2.Eip("MyElasticIP");
      var instance = new cn.Ec2.Instance("MyInstance");
      resource.setInstanceId(instance);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIP",
        "Properties": {
          "InstanceId": {
            "Ref": "MyInstance"
          }
        }
      });
    });
    it('should accept string', function() {
      var resource = new cn.Ec2.Eip("MyElasticIP");
      var instance = new cn.Ec2.Instance("MyInstance");
      resource.setInstanceId("i-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIP",
        "Properties": {
          "InstanceId": "i-12345678"
        }
      });
    });
    it('should reject invalid string', function() {
      var resource = new cn.Ec2.Eip("MyElasticIP");
      var instance = new cn.Ec2.Instance("MyInstance");
      should.throws(function() {
        resource.setInstanceId("intance-123456");
      });
    });
  });
});
