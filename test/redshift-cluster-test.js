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

  describe('ClusterParameterGroupName', function() {
    it('should accept string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setClusterParameterGroupName("MyParameterGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "ClusterParameterGroupName": "MyParameterGroup",
        }
      });
    });
  });

  describe('ClusterSecurityGroups', function() {
    it('should accept list of security groups', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      var sg = new cn.Redshift.ClusterSecurityGroup("MySecurityGroup");
      resource.setClusterSecurityGroups([sg]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "ClusterSecurityGroups": [{
            "Ref": "MySecurityGroup"
          }],
        }
      });
    });
  });

  describe('ClusterSubnetGroupName', function() {
    it('should accept a reference', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      var csg = new cn.Redshift.ClusterSubnetGroup("MyClusterSubnetGroup");
      resource.setClusterSubnetGroupName([csg]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "ClusterSubnetGroupName": [{
            "Ref": "MyClusterSubnetGroup"
          }],
        }
      });
    });
  });

  describe('ClusterSubnetGroupName', function() {
    it('should accept multi-node', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setClusterType("multi-node");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "ClusterType": "multi-node"
        }
      });
    });

    it('should accept single-node', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setClusterType("single-node");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "ClusterType": "single-node"
        }
      });
    });

    it('should reject invalid values', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      should(function() {
        resource.setClusterType("zero-node");
      }).throw(/Invalid cluster type./);
    });
  });

  describe('ClusterVersion', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setClusterVersion("1.0");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "ClusterVersion": "1.0"
        }
      });
    });
  });

  describe('DBName', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setDbName("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "DBName": "example"
        }
      });
    });
  });

  describe('MasterUsername', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setMasterUsername("admin");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "MasterUsername": "admin"
        }
      });
    });
  });

  describe('MasterUserPassword', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setMasterUserPassword("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "MasterUserPassword": "example"
        }
      });
    });
  });

  describe('NodeType', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setNodeType("dc1.large");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "NodeType": "dc1.large"
        }
      });
    });
  });

  describe('NumberOfNodes', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setNumberOfNodes(12);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "NumberOfNodes": 12
        }
      });
    });
  });

  describe('NumberOfNodes', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      resource.setNumberOfNodes(12);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "NumberOfNodes": 12
        }
      });
    });
  });

  describe('VpcSecurityGroupIds', function() {
    it('should accept a string', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      var sg = new cn.Ec2.SecurityGroup("MyGroup");
      resource.setVpcSecurityGroupIds([sg]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster",
        "Properties": {
          "VpcSecurityGroupIds": [
            {
              "Fn::GetAtt": [
                "MyGroup",
                "GroupId"
              ]
            }
          ]
        }
      });
    });
  });
});
