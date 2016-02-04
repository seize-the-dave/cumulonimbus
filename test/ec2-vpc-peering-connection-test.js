var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::VPCPeeringConnection', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCPeeringConnection"
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setVpcId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCPeeringConnection",
        "Properties": {
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setVpcId("vpc-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCPeeringConnection",
        "Properties": {
          "VpcId": "vpc-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      (function() {
        resource.setVpcId("cloud-123456");
      }).should.throw(/vpc-/);
    });
  });

  describe('PeerVpcId', function() {
    it('accepts parameter', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      var param = new cn.Parameter("MyPeerVpc", "AWS::EC2::VPC::Id");
      resource.setPeerVpcId(param);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCPeeringConnection",
        "Properties": {
          "PeerVpcId": {
            "Ref": "MyPeerVpc"
          }
        }
      });
    });

    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setPeerVpcId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCPeeringConnection",
        "Properties": {
          "PeerVpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setPeerVpcId("vpc-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPCPeeringConnection",
        "Properties": {
          "PeerVpcId": "vpc-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      (function() {
        resource.setPeerVpcId("cloud-123456");
      }).should.throw(/vpc-/);
    });
  });

  describe('validation', function() {
    it('should require VpcId', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setPeerVpcId("vpc-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("VpcId");
    });
    it('should require PeerVpcId', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setVpcId("vpc-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("PeerVpcId");
    });
    it('should validate valid object', function() {
      var resource = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setVpcId("vpc-12345678");
      resource.setPeerVpcId("vpc-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.not.exist(actual);
    });
  });
});
