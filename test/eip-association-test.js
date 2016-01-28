var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::EC2::EIPAssociation', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation"
      });
    });
  });

  describe('AllocationId', function() {
    it('should accept reference', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      var eip = new cn.Ec2.Eip("MyElasticIP");
      resource.setAllocationId(eip);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "AllocationId": {
            "Fn::GetAtt": ["MyElasticIP", "AllocationId"]
          }
        }
      });
    });
    it('should accept string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      resource.setAllocationId("eipalloc-5723d13e");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "AllocationId": "eipalloc-5723d13e"
        }
      });
    });
    it('should reject invalid string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      (function() {
        resource.setAllocationId("allocation-5723d13e");
      }).should.throw(/eipalloc-/);
    });
  });

  describe('EIP', function() {
    it('should accept reference', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      var eip = new cn.Ec2.Eip("MyElasticIP");
      resource.setEip(eip);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "EIP": {
            "Ref": "MyElasticIP"
          }
        }
      });
    });
    it('should accept string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      resource.setEip("54.164.73.115");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "EIP": "54.164.73.115"
        }
      });
    });
  });

  describe('InstanceId', function() {
    it('should accept reference', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      var instance = new cn.Ec2.Instance("MyInstance");
      resource.setInstanceId(instance);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "InstanceId": {
            "Ref": "MyInstance"
          }
        }
      });
    });
    it('should accept string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      resource.setInstanceId("i-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "InstanceId": "i-12345678"
        }
      });
    });
    it('should reject invalid string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      (function() {
        resource.setInstanceId("intance-123456");
      }).should.throw(/i-/);
    });
  });

  describe('NetworkInterfaceId', function() {
    // TODO
    // it('should accept reference', function() {
    //   var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
    //   var instance = new cn.Ec2.Instance("MyInstance");
    //   resource.setInstanceId(instance);
    //   should(resource.toJson()).deepEqual({
    //     "Type": "AWS::EC2::EIPAssociation",
    //     "Properties": {
    //       "InstanceId": {
    //         "Ref": "MyInstance"
    //       }
    //     }
    //   });
    // });
    it('should accept string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      resource.setNetworkInterfaceId("eni-03d59a4f");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "NetworkInterfaceId": "eni-03d59a4f"
        }
      });
    });
    it('should reject invalid string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      (function() {
        resource.setNetworkInterfaceId("network-123456");
      }).should.throw(/eni-/);
    });
  });

  describe('PrivateIpAddress', function() {
    it('should accept string', function() {
      var resource = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
      resource.setPrivateIpAddress("10.5.229.195");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::EIPAssociation",
        "Properties": {
          "PrivateIpAddress": "10.5.229.195"
        }
      });
    });
  });
});
