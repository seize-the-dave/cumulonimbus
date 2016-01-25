var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('Resource', function() {
  describe('when instantiating a new resource', function() {
    it('we get only the type key', function() {
      var resource = new cn.Resource("VPC", "AWS::EC2::VPC");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC"
      });
    });
  });
});
