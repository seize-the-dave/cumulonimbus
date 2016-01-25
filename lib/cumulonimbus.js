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
  return {"AWSTemplateFormatVersion": this.version};
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
}
Resource.prototype.constructor = Resource;
Resource.prototype.toJson = function() {
  return {
    "Type": this.type
  };
};
module.exports.Resource = Resource;
