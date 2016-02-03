var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::RDS::DBCluster', function() {
  describe('Constructor', function() {
    it('should output correct format', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster"
      });
    });
  });

  describe('AvailabilityZones', function() {
    it('should accept list of AZs', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setAvailabilityZones(["us-east-1a", "us-east-1c"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "AvailabilityZones": ["us-east-1a", "us-east-1c"]
        }
      });
    });
  });

  describe('BackupRetentionPeriod', function() {
    it('should accept integer', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setBackupRetentionPeriod(14);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "BackupRetentionPeriod": 14
        }
      });
    });
  });

  describe('DatabaseName', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setDatabaseName("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "DatabaseName": "example"
        }
      });
    });
  });

  describe('DBClusterParameterGroupName', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setDbClusterParameterGroupName("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "DBClusterParameterGroupName": "example"
        }
      });
    });
  });

  describe('DBSubnetGroupName', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setDbSubnetGroupName("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "DBSubnetGroupName": "example"
        }
      });
    });
  });

  describe('Engine', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setEngine("aurora");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "Engine": "aurora"
        }
      });
    });
  });

  describe('EngineVersion', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setEngineVersion("5.6.23");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "EngineVersion": "5.6.23"
        }
      });
    });
  });

  describe('MasterUsername', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setMasterUsername("root");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "MasterUsername": "root"
        }
      });
    });
  });

  describe('MasterUserPassword', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setMasterUserPassword("secret");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "MasterUserPassword": "secret"
        }
      });
    });
  });

  describe('Port', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setPort(3306);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "Port": 3306
        }
      });
    });
  });

  describe('PreferredBackupWindow', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setPreferredBackupWindow("04:00-04:30");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "PreferredBackupWindow": "04:00-04:30"
        }
      });
    });
  });

  describe('PreferredMaintenanceWindow', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setPreferredMaintenanceWindow("Tue05:00-05:30");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "PreferredMaintenanceWindow": "Tue05:00-05:30"
        }
      });
    });
  });

  describe('SnapshotIdentifier', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setSnapshotIdentifier("my-cluster-snapshot1");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "SnapshotIdentifier": "my-cluster-snapshot1"
        }
      });
    });
  });

  describe('VpcSecurityGroupIds', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      resource.setVpcSecurityGroupIds(["sg-12345678"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "VpcSecurityGroupIds": ["sg-12345678"]
        }
      });
    });

    it('should accept objects', function() {
      var resource = new cn.Rds.DbCluster("MyDbCluster");
      var sg = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setVpcSecurityGroupIds([sg]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBCluster",
        "Properties": {
          "VpcSecurityGroupIds": [{
            "Ref": "MySecurityGroup"
          }]
        }
      });
    });
  });
});
