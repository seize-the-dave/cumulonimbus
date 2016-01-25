var should = require('should'),
    Resource = require('../lib/Resource').Resource;

describe('Resource', function() {
  describe('New Instance', function() {
    it('error should be thrown for malformed key', function() {
      should.throws(function() {
        new Resource("Malformed Example", "AWS::EC2::VPC");
      });
    });
  });
});
