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
      resource.setSubnetId("subnet-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "SubnetId": "subnet-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      (function() {
        resource.setSubnetId("net-123456");
      }).should.throw(/subnet-/);
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
      resource.setRouteTableId("rtb-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SubnetRouteTableAssociation",
        "Properties": {
          "RouteTableId": "rtb-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      (function() {
        resource.setRouteTableId("table-123456");
      }).should.throw(/rtb-/);
    });
  });

  describe('validation', function() {
    it('should require RouteTableId', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setSubnetId("subnet-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("RouteTableId");
    });

    it('should require SubnetId', function() {
      var resource = new cn.Ec2.SubnetRouteTableAssociation("RouteTableAssoc");
      resource.setRouteTableId("rtb-12345678");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("SubnetId");
    });
  });
});
