"use strict";

function Template() {
  this.version = "2010-09-09";
}
Template.prototype.constructor = Template;
Template.prototype.toJson = function(){
  var json = {
    "AWSTemplateFormatVersion": this.version
  };
};
module.exports.Template = Template;
