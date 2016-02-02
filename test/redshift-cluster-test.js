var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::Redshift::Cluster', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster"
      });
    });
  });

  describe('AllowVersionUpgrade', function() {
    it('should accept boolean', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setAllowVersionUpgrade(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "AllowVersionUpgrade": true,
        }
      });
    });
  });

  describe('AutomatedSnapshotRetentionPeriod', function() {
    it('should accept integer', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setAutomatedSnapshotRetentionPeriod(7);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "AutomatedSnapshotRetentionPeriod": 7,
        }
      });
    });
  });

  describe('AvailabilityZone', function() {
    it('should accept string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setAvailabilityZone("us-east-1a");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "AvailabilityZone": "us-east-1a",
        }
      });
    });
  });
});
