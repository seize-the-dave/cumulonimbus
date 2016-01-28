var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::PlacementGroup', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.PlacementGroup("MyPlacementGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::PlacementGroup",
        "Properties": {
          "Strategy": "cluster"
        }
      });
    });
  });
});
