var Resource = require("../Resource").Resource;
var inherits = require("util").inherits;
var cn = require("../cumulonimbus");

var Redshift = {};
module.exports.extend = function(exports) {
  exports.Redshift = Redshift;
}

// AWS::Redshift::ClusterSubnetGroup
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html
function ClusterSubnetGroup(key) {
  Resource.call(this, key, "AWS::Redshift::ClusterSubnetGroup");
}
inherits(ClusterSubnetGroup, Resource);
Redshift.ClusterSubnetGroup = ClusterSubnetGroup;

ClusterSubnetGroup.prototype.setDescription = function(desc) {
  this.addProperty("Description", desc);
}
ClusterSubnetGroup.prototype.setSubnetIds = function(subnetIds) {
  var copiedSubnetIds = [];
  for (var i = 0; i < subnetIds.length; i++) {
    copiedSubnetIds[i] = cn.Ec2.Subnet.validate(subnetIds[i]);
  }
  this.addProperty("SubnetIds", copiedSubnetIds);
}

// AWS::Redshift::ClusterSecurityGroup
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroup.html
function ClusterSecurityGroup(key) {
  Resource.call(this, key, "AWS::Redshift::ClusterSecurityGroup");
}
inherits(ClusterSecurityGroup, Resource);
Redshift.ClusterSecurityGroup = ClusterSecurityGroup;

ClusterSecurityGroup.prototype.setDescription = function(desc) {
  this.addProperty("Description", desc);
}

// AWS::Redshift::Cluster
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clustersubnetgroupname
// https://docs.aws.amazon.com/redshift/latest/APIReference/API_CreateCluster.html
function Cluster(key) {
  Resource.call(this, key, "AWS::Redshift::Cluster");
}
inherits(Cluster, Resource);
Redshift.Cluster = Cluster;

Cluster.prototype.setAllowVersionUpgrade = function(upgrade) {
  this.addProperty("AllowVersionUpgrade", upgrade);
}
Cluster.prototype.setAutomatedSnapshotRetentionPeriod = function(period) {
  this.addProperty("AutomatedSnapshotRetentionPeriod", period);
}
Cluster.prototype.setAvailabilityZone = function(az) {
  this.addProperty("AvailabilityZone", az);
}
