var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::RouteTable', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.RouteTable("RouteTable");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::RouteTable"
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var rt = new cn.Ec2.RouteTable("RouteTable");
      rt.setVpcId(vpc);
      should(rt.toJson()).deepEqual({
        "Type": "AWS::EC2::RouteTable",
        "Properties": {
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var rt = new cn.Ec2.RouteTable("RouteTable");
      rt.setVpcId("vpc-12345678");
      should(rt.toJson()).deepEqual({
        "Type": "AWS::EC2::RouteTable",
        "Properties": {
          "VpcId": "vpc-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.RouteTable("RouteTable");
      (function() {
        resource.setVpcId("cloud-123456");
      }).should.throw(/vpc-/);
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.RouteTable("RouteTable");
      resource.addTag("Name", "RouteTable");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::RouteTable",
        "Properties": {
          "Tags": {
            "Name": "RouteTable"
          }
        }
      });
    });
  });

  describe('validation', function() {
    it('should require VpcId', function() {
      var resource = new cn.Ec2.RouteTable("RouteTable");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("VpcId");
    });

    it('should allow valid object', function() {
      var resource = new cn.Ec2.RouteTable("RouteTable");
      resource.setVpcId("vpc-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.not.exist(actual);
    });
  });
});
