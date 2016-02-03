"use strict";

function getPsuedoParameter(suffix) {
  return {
    "Ref": "AWS::" + suffix
  }
}

function Template() {
  this.version = "2010-09-09";
  this.resources = [];
}
Template.prototype.constructor = Template;
Template.prototype.addResource = function(resource) {
  this.resources.push(resource);
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

var normalizedPath = require("path").join(__dirname, "modules");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./modules/" + file).extend(module.exports);
});
