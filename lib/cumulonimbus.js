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
  if (Object.keys(this.resources).length > 0) {
    template.Resources = {};
  }
  for (var key in this.resources) {
    template.Resources[key] = this.resources[key].toJson();
  }
  return template;
};
Template.prototype.validate = function(callback) {
  var errors = [];
  if (Object.keys(this.resources).length === 0) {
    errors.push(new Error("Templates must include at least one resource."));
  } else {
    var collector = function(err) {
      errors.push(err);
    };
    for (var key in this.resources) {
      var resource = this.resources[key];
      resource.validate(collector);
    }
  }
  if (errors.length > 0) {
    callback(errors);
  } else {
    callback();
  }
};
module.exports.Template = Template;
module.exports.Ec2 = require('./Ec2')
