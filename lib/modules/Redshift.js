var Resource = require("../Resource").Resource;
var inherits = require("util").inherits;

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
