var should = require('should');
var Parameter = require('../lib/cumulonimbus').Parameter;

describe('Parameter', function() {
  describe('Constructor', function() {
    it('should require a key', function() {
      should(function() {
        new Parameter();
      }).throw(/Key/);
    });
  });

  describe('Constructor', function() {
    it('should require a type', function() {
      should(function() {
        new Parameter("Ec2Instance");
      }).throw(/Type/);
    });

    it('should reject unknown types', function() {
      should(function() {
        new Parameter("Ec2Instance", "Example");
      }).throw(/Unknown type/);
    });

    var knownTypes = [
      "String",
      "Number",
      "List<Number>",
      "CommaDelimitedList",
      "AWS::EC2::AvailabilityZone::Name",
      "AWS::EC2::Image::Id",
      "AWS::EC2::Instance::Id",
      "AWS::EC2::KeyPair::KeyName",
      "AWS::EC2::SecurityGroup::GroupName",
      "AWS::EC2::SecurityGroup::Id",
      "AWS::EC2::Subnet::Id",
      "AWS::EC2::Volume::Id",
      "AWS::EC2::VPC::Id",
      "AWS::Route53::HostedZone::Id",
      "List<AWS::EC2::AvailabilityZone::Name>",
      "List<AWS::EC2::Image::Id>",
      "List<AWS::EC2::Instance::Id>",
      "List<AWS::EC2::SecurityGroup::GroupName>",
      "List<AWS::EC2::SecurityGroup::Id>",
      "List<AWS::EC2::Subnet::Id>",
      "List<AWS::EC2::Volume::Id>",
      "List<AWS::EC2::VPC::Id>",
      "List<AWS::Route53::HostedZone::Id>"
    ];

    for (var offset in knownTypes) {
      var type = knownTypes[offset];
      it('Should accept a ' + type, function() {
        var param = new Parameter("Ec2Instance", type);
        should(param.toJson()).deepEqual({
          "Type": type,
        });
      });
    }
  });

  describe('Description', function() {
    it('should accept a string', function() {
      var param = new Parameter("Ec2Instance", "AWS::EC2::Instance::Id");
      param.setDescription("Example");
      should(param.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance::Id",
        "Description": "Example"
      });
    });
  });

  describe('Default', function() {
    it('should accept a string', function() {
      var param = new Parameter("Ec2Instance", "String");
      param.setDefault("default");
      should(param.toJson()).deepEqual({
        "Type": "String",
        "Default": "default"
      });
    });
  });
});
