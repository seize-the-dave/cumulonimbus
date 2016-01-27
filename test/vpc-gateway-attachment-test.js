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
      resource.setVpcId("vpc-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "VpcId": "vpc-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      should.throws(function() {
        resource.setVpcId("cloud-123456");
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
      resource.setInternetGatewayId("igw-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "InternetGatewayId": "igw-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("RouteTableAssoc");
      should.throws(function() {
        resource.setInternetGatewayId("gateway-123456");
      });
    });
  });

  describe('VpnGatewayId', function() {
    it('accepts reference', function() {
      var gateway = new cn.Ec2.VpnGateway("Gateway");
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      resource.setVpnGatewayId(gateway);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "VpnGatewayId": {
            "Ref": "Gateway"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("Attachment");
      resource.setVpnGatewayId("vgw-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCGatewayAttachment",
        "Properties": {
          "VpnGatewayId": "vgw-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("RouteTableAssoc");
      should.throws(function() {
        resource.setVpnGatewayId("gateway-12345678");
      });
    });
  });

  describe('validation', function() {
    it('should require InternetGatewayId or VpnGatewayId', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("RouteTableAssoc");
      resource.setVpcId("vpc-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("InternetGatewayId");
    });

    it('should require VpcId', function() {
      var resource = new cn.Ec2.VpcGatewayAttachment("RouteTableAssoc");
      resource.setInternetGatewayId("igw-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("VpcId");
    });
  });
});
