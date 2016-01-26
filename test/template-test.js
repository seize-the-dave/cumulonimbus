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
    it("should not return an error for complete resources", function() {
      var template = new cn.Template();
      var vpc = new cn.Ec2.Vpc("VPC");
      vpc.setCidrBlock("10.0.0.0/16");
      template.addResource(vpc);
      template.validate(function(err) {
        should.not.exist(err);
      });
    });
    it("then it should return an error for an incomplete resource", function() {
      var template = new cn.Template();
      template.addResource(new cn.Ec2.Vpc("VPC"));
      template.validate(function(err) {
        should.exist(err);
      });
    });
  });

  describe('when adding a resource to a template', function() {
    it("should contain that resource in the JSON output", function() {
      var template = new cn.Template();
      template.addResource(new cn.Ec2.Vpc("VPC"));
      should(template.toJson()).containEql({
        "Resources": {
          "VPC": {
            "Type": "AWS::EC2::VPC"
          }
        }
      });
    });
  });
});
