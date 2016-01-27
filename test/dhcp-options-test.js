var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::DHCPOptions', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::DHCPOptions"
      });
    });
  });

  describe('DomainName', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.setDomainName("example.com");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::DHCPOptions",
        "Properties": {
          "DomainName": "example.com"
        }
      });
    });
  });

  describe('DomainNameServers', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.setDomainNameServers(["10.0.0.1", "10.0.0.2"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::DHCPOptions",
        "Properties": {
          "DomainNameServers": ["10.0.0.1", "10.0.0.2"]
        }
      });
    });
  });

  describe('NetbiosNameServers', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.setNetbiosNameServers(["10.0.0.1", "10.0.0.2"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::DHCPOptions",
        "Properties": {
          "NetbiosNameServers": ["10.0.0.1", "10.0.0.2"]
        }
      });
    });
  });

  describe('NetbiosNameServers', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.setNetbiosNodeType(1);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::DHCPOptions",
        "Properties": {
          "NetbiosNodeType": 1
        }
      });
    });
  });

  describe('NtpServers', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.setNtpServers(["10.0.0.1", "10.0.0.2"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::DHCPOptions",
        "Properties": {
          "NtpServers": ["10.0.0.1", "10.0.0.2"]
        }
      });
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.addTag("Name", "DhcpOptions");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::DHCPOptions",
        "Properties": {
          "Tags": {
            "Name": "DhcpOptions"
          }
        }
      });
    });
  });

  describe('validation', function() {
    it('should require DomainNameServers, NetbiosNameServers or NtpServers', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.validate(function(err) {
        should.exist(err);
      })
    });
    it('should require NetbiosNodeType if NetbiosNameServers is set', function() {
      var resource = new cn.Ec2.DhcpOptions("DhcpOptions");
      resource.setNetbiosNameServers(["10.0.0.1"]);
      resource.validate(function(err) {
        should.exist(err);
      })
    });
  });
});
