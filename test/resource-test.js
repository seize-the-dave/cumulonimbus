var should = require('should');
var Resource = require('../lib/Resource').Resource;
var cn = require('../lib/cumulonimbus');

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

  describe('DependsOn', function() {
    it('should accept a string', function() {
      var resource = new Resource("MyResoure", "AWS::EC2::VPC");
      resource.dependsOn("Example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "DependsOn": "Example"
      });
    });

    it('should accept a resource', function() {
      var resource = new Resource("MyResoure", "AWS::EC2::VPC");
      var dep = new Resource("MyDependency", "AWS::EC2::Instance");
      resource.dependsOn(dep);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "DependsOn": "MyDependency"
      });
    });
  });

  describe('Metadata', function() {
    it('should accept an object', function() {
      var resource = new Resource("MyResoure", "AWS::EC2::VPC");
      resource.setMetadata({"Object1": "Location1"});
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Metadata": {
          "Object1": "Location1"
        }
      });
    });

    it('should accept a resource', function() {
      var resource = new Resource("MyResoure", "AWS::EC2::VPC");
      var dep = new Resource("MyDependency", "AWS::EC2::Instance");
      resource.dependsOn(dep);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "DependsOn": "MyDependency"
      });
    });
  });

  describe('get reference', function() {
    it('should return a JSON object', function() {
      var resource = new Resource("MyResource", "AWS::EC2::VPC");
      should(resource.getRef()).deepEqual({
        "Ref": "MyResource"
      });
    });
  });

  describe('Condition', function() {
    it('should accept a condition object', function() {
      var resource = new Resource("MyResource", "AWS::EC2::VPC");
      var cond = new cn.Condition("MyCondition", cn.Fn.Equals("0", "0"));
      resource.setCondition(cond);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Condition": "MyCondition"
      });
    });

    it('should accept a string', function() {
      var resource = new Resource("MyResource", "AWS::EC2::VPC");
      resource.setCondition("MyCondition");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Condition": "MyCondition"
      });
    });
  });
});
