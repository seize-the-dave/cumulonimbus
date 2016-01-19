"use strict";

function Template() {
  this.version = "2010-09-09";
}
Template.prototype.constructor = Template;
Template.prototype.toJson = function(){
  return {"AWSTemplateFormatVersion": this.version};
};
module.exports.Template = Template;
