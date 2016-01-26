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

  describe('SubnetId', function() {
    it('accepts reference', function() {
      var subnet = new cn.Ec2.Subnet("MySubnet");
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setSubnetId(subnet);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "SubnetId": {
            "Ref": "MySubnet"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setSubnetId("subnet-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "SubnetId": "subnet-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      should.throws(function() {
        resource.setSubnetId("net-123456");
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
        resource.setRouteTableId("table-123456");
      });
    });
  });
});
