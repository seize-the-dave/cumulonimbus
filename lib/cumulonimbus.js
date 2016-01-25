"use strict";

function Template() {
  this.version = "2010-09-09";
  this.resources = {};
}
Template.prototype.constructor = Template;
Template.prototype.addResource = function(resource) {
  this.resources[resource.key] = resource;
};
Template.prototype.toJson = function() {
  var template = {
    "AWSTemplateFormatVersion": this.version
  };
  for (var key in this.resources) {
    if (template.Resources === undefined) {
      template.Resources = {};
    }
    if (this.resources.hasOwnProperty(key)) {
      template.Resources[key] = this.resources[key].toJson();
    }
  }
  return template;
};
Template.prototype.validate = function(callback) {
  if (Object.keys(this.resources).length === 0) {
    callback(new Error("Templates must include at least one resource."));
  } else {
    callback();
  }
};
module.exports.Template = Template;

function Resource(key, type) {
  this.key = key;
  this.type = type;
  this.properties = {};
}
Resource.prototype.constructor = Resource;
Resource.prototype.addProperty = function(key, value) {
  this.properties[key] = value;
};
Resource.prototype.addTag = function(key, value) {
  if (this.properties.Tags === undefined) {
    this.properties.Tags = {};
  }
  this.properties.Tags[key] = value;
};
Resource.prototype.toJson = function() {
  var resource = {
    "Type": this.type
  };
  for (var key in this.properties) {
    if (this.properties.hasOwnProperty(key)) {
      if (resource.Properties === undefined) {
        resource.Properties = {};
      }
      resource.Properties[key] = this.properties[key];
    }
  }
  return resource;
};

function VPC(key) {
  Resource.call(this, key, "AWS::EC2::VPC");
}
VPC.prototype = Object.create(Resource.prototype);
VPC.prototype.constructor = VPC;
VPC.prototype.setCidrBlock = function(cidrBlock) {
  Resource.prototype.addProperty.call(this, "CidrBlock", cidrBlock);
};
VPC.prototype.enableDnsSupport = function(dnsSupport) {
  Resource.prototype.addProperty.call(this, "EnableDnsSupport", dnsSupport);
};
VPC.prototype.enableDnsHostnames = function(dnsHostnames) {
  Resource.prototype.addProperty.call(this, "EnableDnsHostnames", dnsHostnames);
};
VPC.prototype.setInstanceTenancy = function(tenancy) {
  Resource.prototype.addProperty.call(this, "InstanceTenancy", tenancy);
};

module.exports.EC2 = {};
module.exports.EC2.VPC = VPC;
