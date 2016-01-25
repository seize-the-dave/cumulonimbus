var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::SubnetRouteTableAssociation', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation"
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setVpcId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setVpcId("vpc-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "VpcId": "vpc-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      should.throws(function() {
        resource.setVpcId("cloud-123456")
      });
    });
  });

  describe('RouteTableId', function() {
    it('accepts reference', function() {
      var routeTable = new cn.Ec2.RouteTable("RouteTable");
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setRouteTableId(routeTable);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "RouteTableId": {
            "Ref": "RouteTable"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setRouteTableId("rtb-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "RouteTableId": "rtb-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      should.throws(function() {
        resource.setRouteTableId("table-123456")
      });
    });
  });
});
