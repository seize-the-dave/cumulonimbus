"use strict";

function Template() {
  this.version = "2010-09-09";
  this.resources = [];
}
Template.prototype.constructor = Template;
Template.prototype.addResource = function(resource) {
  this.resources.push(resource);
};
Template.prototype.toJson = function() {
  var template = {
    "AWSTemplateFormatVersion": this.version
  };
  if (this.resources.length > 0) {
    template.Resources = {};
  }
  for (var i = 0; i < this.resources.length; i++) {
    var resource = this.resources[i];
    template.Resources[resource.key] = resource.toJson();
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
module.exports.Ec2 = require('./Ec2');
module.exports.Iam = require('./Iam');
module.exports.Sns = require('./Sns');
