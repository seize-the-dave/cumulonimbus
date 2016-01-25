"use strict";

function Template() {
  this.version = "2010-09-09";
  this.resources = []
}
Template.prototype.constructor = Template;
Template.prototype.toJson = function(){
  return {"AWSTemplateFormatVersion": this.version};
};
Template.prototype.validate = function(callback) {
  if (this.resources.length == 0) {
    callback(new Error("Templates must include at least one resource."))
  } else {
    callback()
  }
}
module.exports.Template = Template;
