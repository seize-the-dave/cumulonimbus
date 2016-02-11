var cn = require("../cumulonimbus");
var Resource = cn.Resource;
var inherits = require("util").inherits;

var CodeDeploy = {};
module.exports.extend = function(exports) {
  exports.CodeDeploy = CodeDeploy;
};

// AWS::CodeDeploy::Application
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-application.html
function Application(key) {
  Resource.call(this, key, "AWS::CodeDeploy::Application");
}
inherits(Application, Resource);
CodeDeploy.Application = Application;

Application.prototype.setApplicationName = function(name) {
  this.addProperty("ApplicationName", name);
};
