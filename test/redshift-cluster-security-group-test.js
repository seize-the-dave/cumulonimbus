var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::Redshift::ClusterSecurityGroup', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Redshift.ClusterSecurityGroup("MyClusterSubnetGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::ClusterSecurityGroup"
      });
    });
  });

  describe('Description', function() {
    it('should accept string', function() {
      var resource = new cn.Redshift.ClusterSecurityGroup("MyClusterSecurityGroup");
      resource.setDescription("MyClusterSecurityGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::ClusterSecurityGroup",
        "Properties": {
          "Description": "MyClusterSecurityGroup"
        }
      });
    });
  });
});
