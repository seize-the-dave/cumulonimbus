var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::VPCGatewayAttachment', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment"
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      resource.setVpcId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      resource.setVpcId("vpc-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "VpcId": "vpc-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      should.throws(function() {
        resource.setVpcId("cloud-123456")
      });
    });
  });

  describe('InternetGatewayId', function() {
    it('accepts reference', function() {
      var gateway = new cn.Ec2.InternetGateway("Gateway");
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      resource.setInternetGatewayId(gateway);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "InternetGatewayId": {
            "Ref": "Gateway"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      resource.setInternetGatewayId("igw-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "InternetGatewayId": "igw-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("RouteTableAssoc");
      should.throws(function() {
        resource.setInternetGatewayId("gateway-123456")
      });
    });
  });
});
