var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::RDS::DBSubnetGroup', function() {
  describe('Constructor', function() {
    it('should output correct format', function() {
      var resource = new cn.Rds.DbSubnetGroup("MySubnetGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBSubnetGroup"
      });
    });
  });

  describe('DBSubnetGroupDescription', function() {
    it('should accept string', function() {
      var resource = new cn.Rds.DbSubnetGroup("MySubnetGroup");
      resource.setDbSubnetGroupDescription("example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBSubnetGroup",
        "Properties": {
          "DBSubnetGroupDescription": "example"
        }
      });
    });
  });

  describe('SubnetIds', function() {
    it('should accept list of instances', function() {
      var resource = new cn.Rds.DbSubnetGroup("MySubnetGroup");
      var subnet = new cn.Ec2.Subnet("MySubnet");
      resource.setSubnetIds([subnet]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBSubnetGroup",
        "Properties": {
          "SubnetIds": [{
            "Ref": "MySubnet"
          }]
        }
      });
    });

    it('should accept list of strings', function() {
      var resource = new cn.Rds.DbSubnetGroup("MySubnetGroup");
      resource.setSubnetIds(["subnet-12345678"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::RDS::DBSubnetGroup",
        "Properties": {
          "SubnetIds": ["subnet-12345678"]
        }
      });
    });
  });
});
