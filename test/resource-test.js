var should = require('should'),
    Resource = require('../lib/Resource').Resource;

describe('Resource', function() {
  describe('New Instance', function() {
    it('error should be thrown for malformed key', function() {
      should.throws(function() {
        new Resource("Malformed Example", "AWS::EC2::VPC");
      });
    });

    it('error should be thrown for missing key', function() {
      should.throws(function() {
        new Resource(undefined, "AWS::EC2::VPC");
      });
    });
  });

  describe('validation', function() {
    it('should not return an error by default', function() {
      var resource = new Resource("MyResoure", "AWS::EC2::VPC");
      resource.validate(function(err) {
        should.not.exist(err);
      });
    });
  });
});
