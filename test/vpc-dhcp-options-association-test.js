var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::VPCDHCPOptionsAssociation', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCDHCPOptionsAssociation"
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      resource.setVpcId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCDHCPOptionsAssociation",
        "Properties": {
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      resource.setVpcId("vpc-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCDHCPOptionsAssociation",
        "Properties": {
          "VpcId": "vpc-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      should.throws(function() {
        resource.setVpcId("cloud-123456")
      });
    });
  });

  describe('DhcpOptionsId', function() {
    it('accepts reference', function() {
      var dhcpOptions = new cn.Ec2.DhcpOptions("DhcpOptions");
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      resource.setDhcpOptionsId(dhcpOptions);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCDHCPOptionsAssociation",
        "Properties": {
          "DhcpOptionsId": {
            "Ref": "DhcpOptions"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      resource.setDhcpOptionsId("dopt-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCDHCPOptionsAssociation",
        "Properties": {
          "DhcpOptionsId": "dopt-123456"
        }
      });
    });

    it('rejects malformed string', function() {
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      should.throws(function() {
        resource.setDhcpOptionsId("dhcp-123456");
      });
    });
  });

  describe('validation', function() {
    it('should require DhcpOptionsId', function() {
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      resource.setVpcId("vpc-123456");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("DhcpOptionsId");
    });

    it('should require VpcId', function() {
      var resource = new cn.Ec2.VpcDhcpOptionsAssociation("VpcDhcpOptionsAssociation");
      resource.setDhcpOptionsId("dopt-123456");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("VpcId");
    });
  });
});
