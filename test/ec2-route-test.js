var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::EC2::Route', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route"
      });
    });
  });

  describe('DestinationCidrBlock', function() {
    it('should accept a string', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      resource.setDestinationCidrBlock("0.0.0.0/0")
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "DestinationCidrBlock": "0.0.0.0/0"
        }
      });
    });
  });

  describe('GatewayId', function() {
    it('should accept a valid string', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      resource.setGatewayId("igw-eaad4883")
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "GatewayId": "igw-eaad4883"
        }
      });
    });

    it('should accept a internet gateway', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      var igw = new cn.Ec2.InternetGateway("MyInternetGateway");
      resource.setGatewayId(igw)
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "GatewayId": {
            "Ref": "MyInternetGateway"
          }
        }
      });
    });

    it('should accept a vpn gateway', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      var vgw = new cn.Ec2.VpnGateway("MyVpnGateway");
      resource.setGatewayId(vgw)
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "GatewayId": {
            "Ref": "MyVpnGateway"
          }
        }
      });
    });
  });

  describe('InstanceId', function() {
    it('should accept a string', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      resource.setInstanceId("i-eaad4883")
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "InstanceId": "i-eaad4883"
        }
      });
    });

    it('should accept an instance', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      var instance = new cn.Ec2.Instance("MyInstance");
      resource.setInstanceId(instance);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "InstanceId": {
            "Ref": "MyInstance"
          }
        }
      });
    });
  });

  describe('RouteTableId', function() {
    it('should accept a string', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      resource.setRouteTableId("rtb-eaad4883")
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "RouteTableId": "rtb-eaad4883"
        }
      });
    });

    it('should accept an instance', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      var rtb = new cn.Ec2.RouteTable("MyRouteTable");
      resource.setRouteTableId(rtb);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "RouteTableId": {
            "Ref": "MyRouteTable"
          }
        }
      });
    });
  });

  describe('VpcPeeringConnectionId', function() {
    it('should accept a string', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      resource.setVpcPeeringConnectionId("pcx-eaad4883")
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "VpcPeeringConnectionId": "pcx-eaad4883"
        }
      });
    });

    it('should accept an instance', function() {
      var resource = new cn.Ec2.Route("MyRoute");
      var vpc = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
      resource.setVpcPeeringConnectionId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Route",
        "Properties": {
          "VpcPeeringConnectionId": {
            "Ref": "MyPeeringConnection"
          }
        }
      });
    });
  });
});
