var cn = require("../cumulonimbus");
var TaggableResource = cn.TaggableResource;
var inherits = require("util").inherits;

var Rds = {};
module.exports.extend = function(exports) {
  exports.Rds = Rds;
}

// AWS::RDS::DBCluster
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html
// http://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBCluster.html
function DbCluster(key) {
  TaggableResource.call(this, key, "AWS::RDS::DBCluster");
}
inherits(DbCluster, TaggableResource);
Rds.DbCluster = DbCluster;

DbCluster.prototype.setAvailabilityZones = function(azs) {
  this.addProperty("AvailabilityZones", azs);
}
DbCluster.prototype.setBackupRetentionPeriod = function(period) {
  this.addProperty("BackupRetentionPeriod", period);
}
DbCluster.prototype.setDatabaseName = function(name) {
  this.addProperty("DatabaseName", name);
}
DbCluster.prototype.setDbClusterParameterGroupName = function(name) {
  this.addProperty("DBClusterParameterGroupName", name);
}
DbCluster.prototype.setDbSubnetGroupName = function(name) {
  this.addProperty("DBSubnetGroupName", name);
}
DbCluster.prototype.setEngine = function(engine) {
  this.addProperty("Engine", engine);
}
DbCluster.prototype.setEngineVersion = function(version) {
  this.addProperty("EngineVersion", version);
}
DbCluster.prototype.setMasterUsername = function(username) {
  this.addProperty("MasterUsername", username);
}
DbCluster.prototype.setMasterUserPassword = function(password) {
  this.addProperty("MasterUserPassword", password);
}
DbCluster.prototype.setPort = function(port) {
  this.addProperty("Port", port);
}
DbCluster.prototype.setPreferredBackupWindow = function(window) {
  this.addProperty("PreferredBackupWindow", window);
}
DbCluster.prototype.setPreferredMaintenanceWindow = function(window) {
  this.addProperty("PreferredMaintenanceWindow", window);
}
DbCluster.prototype.setSnapshotIdentifier = function(id) {
  this.addProperty("SnapshotIdentifier", id);
}
DbCluster.prototype.setVpcSecurityGroupIds = function(ids) {
  this.addProperty("VpcSecurityGroupIds", ids.map(function(groupId) {
    return parseResourceId("sg", "Security Group", groupId, cn.Ec2.SecurityGroup);
  }));
}
