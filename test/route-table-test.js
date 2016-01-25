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
      var rt = new cn.Ec2.RouteTable("Subnet");
      rt.setVpcId("vpc-123456");
      should(rt.toJson()).deepEqual({
        "Type": "AWS::EC2::RouteTable",
        "Properties": {
          "VpcId": "vpc-123456"
        }
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
});
