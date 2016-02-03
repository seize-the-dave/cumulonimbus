"use strict";

function getPsuedoParameter(suffix) {
  return {
    "Ref": "AWS::" + suffix
  }
}

function Template() {
  this.version = "2010-09-09";
  this.resources = [];
  this.params = [];
}
Template.prototype.constructor = Template;
Template.prototype.addResource = function(resource) {
  this.resources.push(resource);
};
Template.prototype.addParameter = function(param) {
  this.params.push(param);
};
Template.prototype.setDescription = function(description) {
  this.description = description;
};
Template.prototype.getAccountId = function() {
  return getPsuedoParameter("AccountId");
};
Template.prototype.getNotificationArns = function() {
  return getPsuedoParameter("NotificationARNs");
};
Template.prototype.getNoValue = function() {
  return getPsuedoParameter("NoValue");
};
Template.prototype.getRegion = function() {
  return getPsuedoParameter("Region");
};
Template.prototype.getStackId = function() {
  return getPsuedoParameter("StackId");
};
Template.prototype.getStackName = function() {
  return getPsuedoParameter("StackName");
};
Template.prototype.toJson = function() {
  var template = {
    "AWSTemplateFormatVersion": this.version
  };
  if (this.description !== undefined) {
    template.Description = this.description;
  }
  if (this.resources.length > 0) {
    template.Resources = {};
  }
  for (var i = 0; i < this.resources.length; i++) {
    var resource = this.resources[i];
    template.Resources[resource.key] = resource.toJson();
  }
  if (this.params.length > 0) {
    template.Parameters = {};
  }
  for (var i = 0; i < this.params.length; i++) {
    var param = this.params[i];
    template.Parameters[param.key] = param.toJson();
  }
  return JSON.stringify(template, null, 2);
};
Template.prototype.validate = function(callback) {
  var errors = [];
  if (this.resources.length === 0) {
    errors.push(new Error("Templates must include at least one resource."));
  } else {
    var collector = function(err) {
      errors.push(err);
    };
    for (var i = 0; i < this.resources.length; i++) {
      var resource = this.resources[i];
      resource.validate(collector);
    }
  }
  if (errors.length > 0) {
    callback(errors);
    return;
  } else {
    callback();
    return;
  }
};
module.exports.Template = Template;

// Parameters
function Parameter(key, type) {
  var types = [
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
  if (key === undefined) {
    throw new Error("Key is required.");
  } else {
    this.key = key;
  }
  if (type === undefined) {
    throw new Error("Type is required.");
  }
  if (types.indexOf(type) === -1) {
    throw new Error("Unknown type (was " + type + ")");
  } else {
    this.type = type;
  }
};
module.exports.Parameter = Parameter;
Parameter.prototype.toJson = function() {
  var param = {
    "Type": this.type
  }
  if (this.description !== undefined) {
    param.Description  = this.description;
  }
  if (this.defaultValue !== undefined) {
    param.Default = this.defaultValue;
  }
  return param;
}
Parameter.prototype.setDescription = function(desc) {
  this.description = desc;
}
Parameter.prototype.setDefault = function(defaultValue) {
  this.defaultValue = defaultValue;
}
Parameter.prototype.getRef = function() {
  return {
    "Ref": this.key
  };
}

var normalizedPath = require("path").join(__dirname, "modules");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./modules/" + file).extend(module.exports);
});
