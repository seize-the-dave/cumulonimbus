var should = require('should');
var TaggableResource = require('../lib/Resource').TaggableResource;
var cn = require('../lib/cumulonimbus');

describe('TaggableResource', function() {
  describe('Tags', function() {
    it('should accept a string', function() {
      var resource = new TaggableResource("Example", "AWS::EC2::VPC");
      resource.addTag("Foo", "Value");
      resource.addTag("Bar", "Value");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "Tags": {
            "Foo": "Value",
            "Bar": "Value"
          }
        }
      });
    });

    it('should accept a parameter', function() {
      var resource = new TaggableResource("Example", "AWS::EC2::VPC");
      var param = new cn.Parameter("MyParameter", "String");
      resource.addTag("Foo", param);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "Tags": {
            "Foo": {
              "Ref": "MyParameter"
            }
          }
        }
      });
    });

    it('should accept a parameter', function() {
      var resource = new TaggableResource("Example", "AWS::EC2::VPC");
      var param = new cn.Parameter("MyParameter", "String");
      resource.addTag("Foo", param);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "Tags": {
            "Foo": {
              "Ref": "MyParameter"
            }
          }
        }
      });
    });

    it('should accept a resource', function() {
      var resource = new TaggableResource("Example", "AWS::EC2::VPC");
      var vpc = new cn.Ec2.Vpc("MyVpc");
      resource.addTag("Foo", vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "Tags": {
            "Foo": {
              "Ref": "MyVpc"
            }
          }
        }
      });
    });
  });
});
