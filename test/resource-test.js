var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('VPC', function() {
  describe('when instantiating an empty VPC', function() {
    it('we only get the type key', function() {
      var resource = new cn.EC2.VPC("VPC");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC"
      });
    });
  });

  describe('when setting a CIDR block', function() {
    it('should be in the JSON output', function() {
      var resource = new cn.EC2.VPC("VPC");
      resource.setCidrBlock("10.0.0.0/24");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "CidrBlock": "10.0.0.0/24"
        }
      });
    });
  });
});
