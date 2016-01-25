var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('Template', function() {
  describe('when instantiating an empty template', function() {
    it('should only provide a value for the template format version', function() {
      var template = new cn.Template();
      should(template.toJson()).deepEqual({
        "AWSTemplateFormatVersion": "2010-09-09"
      });
    });
  });

  describe('when validating an empty template', function() {
    it("should return an error if no resources have been added", function() {
      var template = new cn.Template();
      template.validate(function(err) {
        should.exist(err);
      });
    });
  });

  describe('when validating a template with at least one resource', function() {
    it("should not return an error", function() {
      var template = new cn.Template();
      template.addResource(new cn.Resource("VPC", "AWS::EC2::VPC"));
      template.validate(function(err) {
        should.not.exist(err);
      });
    });
  });
});
