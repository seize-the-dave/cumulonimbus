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

  describe('validate', function() {
    it('should throw error for default implementation', function() {
      var resource = new Resource("Key", "Value");
      resource.validate(function(err) {
        should.exist(err);
      });
    });
  });
});
