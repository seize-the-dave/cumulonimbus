function Template(version) {
  this.version = version;
}
Template.prototype.constructor = Template;
Template.prototype.toJson() = function(){
  var json = {
    "AWSTemplateFormatVersion": this.version
  };
};
modules.exports.Template = Template;
