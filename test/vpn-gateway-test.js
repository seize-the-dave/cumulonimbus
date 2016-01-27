var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::VPNGateway', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.VpnGateway("VPN");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPNGateway",
        "Properties": {
          "Type": "ipsec.1"
        }
      });
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.VpnGateway("VPN");
      resource.addTag("Name", "VPN");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPNGateway",
        "Properties": {
          "Type": "ipsec.1",
          "Tags": {
            "Name": "VPN"
          }
        }
      });
    });
  });
});
