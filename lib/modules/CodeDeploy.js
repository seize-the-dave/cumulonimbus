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

// AWS::CodeDeploy::DeploymentGroup
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentgroup.html
function DeploymentGroup(key) {
  Resource.call(this, key, "AWS::CodeDeploy::DeploymentGroup");
}
inherits(DeploymentGroup, Resource);
CodeDeploy.DeploymentGroup = DeploymentGroup;

DeploymentGroup.prototype.setApplicationName = function(name) {
  this.addProperty("ApplicationName", this.simpleFilter(name, Application));
};
DeploymentGroup.prototype.setDeployment = function(deployment) {
  this.addProperty("Deployment", deployment);
};

// Deployment
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codedeploy-deploymentgroup-deployment.html
function Deployment() {}
CodeDeploy.DeploymentGroup.Deployment = Deployment;
Deployment.prototype.setDescription = function(description) {
  this.Description = description;
};
Deployment.prototype.ignoreApplicationStopFailures = function(ignore) {
  this.IgnoreApplicationStopFailures = ignore;
};
Deployment.prototype.setRevision = function(revision) {
  this.Revision = revision;
};

// Revision
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codedeploy-deploymentgroup-deployment-revision.html
function Revision() {}
CodeDeploy.DeploymentGroup.Deployment.Revision = Revision;
Revision.prototype.setRevisionType = function(type) {
  this.RevisionType = type;
};
Revision.prototype.setS3Location = function(location) {
  this.S3Location = location;
};

// S3Location
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codedeploy-deploymentgroup-deployment-revision-s3location.html
function S3Location() {}
CodeDeploy.DeploymentGroup.Deployment.Revision.S3Location = S3Location;
S3Location.prototype.setBucket = function(bucket) {
  this.Bucket = bucket;
};
S3Location.prototype.setBundleType = function(type) {
  this.BundleType = type;
};
S3Location.prototype.setETag = function(eTag) {
  this.ETag = eTag;
};
S3Location.prototype.setKey = function(key) {
  this.Key = key;
};
S3Location.prototype.setVersion = function(version) {
  this.Version = version;
};