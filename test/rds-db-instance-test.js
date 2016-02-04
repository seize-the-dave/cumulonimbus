var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::RDS::DBInstance', function() {
  describe('Constructor', function() {
    it('should output correct format', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance"
      });
    });
  });

  describe('AllocatedStorage', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setAllocatedStorage("100");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "AllocatedStorage": "100"
        }
      });
    });
  });

  describe('AllowMajorVersionUpgrade', function() {
    it('should accept boolean', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setAllowMajorVersionUpgrade(false);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "AllowMajorVersionUpgrade": false
        }
      });
    });
  });

  describe('AutoMinorVersionUpgrade', function() {
    it('should accept boolean', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setAutoMinorVersionUpgrade(false);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "AutoMinorVersionUpgrade": false
        }
      });
    });
  });

  describe('AvailabilityZone', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setAvailabilityZone("us-east-1a");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "AvailabilityZone": "us-east-1a"
        }
      });
    });
  });

  describe('BackupRetentionPeriod', function() {
    it('should accept integer', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setBackupRetentionPeriod(14);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "BackupRetentionPeriod": 14
        }
      });
    });
  });

  describe('DBClusterIdentifier', function() {
    it('should accept cluster', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      var cluster = new cn.Rds.DbCluster("MyCluster");
      resource.setDbClusterIdentifier(cluster);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "DBClusterIdentifier": {
            "Ref": "MyCluster"
          }
        }
      });
    });
  });

  describe('DBInstanceClass', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setDbInstanceClass("db.r3.large");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "DBInstanceClass": "db.r3.large"
        }
      });
    });
  });

  describe('DBInstanceIdentifier', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setDbInstanceIdentifier("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "DBInstanceIdentifier": "example"
        }
      });
    });
  });

  describe('DBName', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setDbName("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "DBName": "example"
        }
      });
    });
  });

  describe('DBSubnetGroupName', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      var subnetGroup = new cn.Rds.DbSubnetGroup("MySubnetGroup");
      resource.setDbSubnetGroupName(subnetGroup);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "DBSubnetGroupName": {
            "Ref": "MySubnetGroup"
          }
        }
      });
    });
  });

  describe('Engine', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbInstance("MyDbInstance");
      resource.setEngine("aurora");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBInstance",
        "Properties": {
          "Engine": "aurora"
        }
      });
    });
  });
});
