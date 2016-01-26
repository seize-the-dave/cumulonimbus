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
  var errors = [];
  if (Object.keys(this.resources).length === 0) {
    errors.push(new Error("Templates must include at least one resource."));
  } else {
    for (var key in this.resources) {
      var resource = this.resources[key];
      resource.validate(function(err) {
        if (err !== undefined) {
          if (err instanceof Error) {
            errors.push(err);
          }
        }
      });
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
