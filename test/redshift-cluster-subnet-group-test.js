var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::Redshift::ClusterSubnetGroup', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Redshift.ClusterSubnetGroup("MyClusterSubnetGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::ClusterSubnetGroup"
      });
    });
  });

  describe('Description', function() {
    it('should accept string', function() {
      var resource = new cn.Redshift.ClusterSubnetGroup("MyClusterSubnetGroup");
      resource.setDescription("MyClusterSubnetGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::ClusterSubnetGroup",
        "Properties": {
          "Description": "MyClusterSubnetGroup"
        }
      });
    });
  });

  describe('SubnetIds', function() {
    it('should accept list of strings', function() {
      var resource = new cn.Redshift.ClusterSubnetGroup("MyClusterSubnetGroup");
      resource.setSubnetIds(["subnet-12345678", "subnet-23456789"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::ClusterSubnetGroup",
        "Properties": {
          "SubnetIds": [
            "subnet-12345678",
            "subnet-23456789"
          ]
        }
      });
    });

    it('should accept list of subnets', function() {
      var resource = new cn.Redshift.ClusterSubnetGroup("MyClusterSubnetGroup");
      var subnetA = new cn.Ec2.Subnet("MySubnetA");
      var subnetB = new cn.Ec2.Subnet("MySubnetB");
      resource.setSubnetIds([subnetA, subnetB]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::ClusterSubnetGroup",
        "Properties": {
          "SubnetIds": [{
            "Ref": "MySubnetA"
          }, {
            "Ref": "MySubnetB"
          }]
        }
      });
    });
  });
});
