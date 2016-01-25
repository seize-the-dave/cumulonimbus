var assert = require('assert'),
    cn = require('../lib/cumulonimbus');

describe('Resource', function() {
  describe('when instantiating a new resource', function() {
    it('we get only the type key', function() {
      var template = new cn.Resource("VPC", "AWS::EC2::VPC").toJson();
      assert.equal(JSON.stringify(template), JSON.stringify({
        "Type": "AWS::EC2::VPC"
      }));
    });
  });
});
