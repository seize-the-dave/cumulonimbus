var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::EC2::SecurityGroup', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup"
      });
    });
  });

  describe('GroupDescription', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setGroupDescription("Description");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup",
        "Properties": {
          "GroupDescription": "Description"
        }
      });
    });
  });

  describe('VpcId', function() {
    it('accepts reference', function() {
      var vpc = new cn.Ec2.Vpc("VPC");
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setVpcId(vpc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup",
        "Properties": {
          "VpcId": {
            "Ref": "VPC"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setVpcId("vpc-12345678");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::SecurityGroup",
        "Properties": {
          "VpcId": "vpc-12345678"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      (function() {
        resource.setVpcId("cloud-123456");
      }).should.throw(/vpc-/);
    });
  });

  describe('SecurityGroupEgress', function() {
    describe('CidrIp', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Egress();
        egress.setCidrIp("10.0.0.0/24");
        resource.setSecurityGroupEgress([egress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupEgress": [{
              "CidrIp": "10.0.0.0/24"
            }]
          }
        });
      });
    });

    describe('FromPort', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Egress();
        egress.setFromPort(22);
        resource.setSecurityGroupEgress([egress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupEgress": [{
              "FromPort": 22
            }]
          }
        });
      });
    });

    describe('IpProtocol', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Egress();
        egress.setIpProtocol("tcp");
        resource.setSecurityGroupEgress([egress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupEgress": [{
              "IpProtocol": "tcp"
            }]
          }
        });
      });
    });

    describe('DestinationSecurityGroupId', function() {
      it('accepts reference', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Egress();
        egress.setDestinationSecurityGroupId(resource);
        resource.setSecurityGroupEgress([egress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupEgress": [{
              "DestinationSecurityGroupId": {
                "Fn::GetAtt": ["MySecurityGroup", "GroupId"]
              }
            }]
          }
        });
      });

      it('accepts string', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Egress();
        egress.setDestinationSecurityGroupId("sg-12345678");
        resource.setSecurityGroupEgress([egress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupEgress": [{
              "DestinationSecurityGroupId": "sg-12345678"
            }]
          }
        });
      });

      it('rejects malformed string', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Egress();
        (function() {
          egress.setDestinationSecurityGroupId("group-1234567");
        }).should.throw(/sg-/);
      });
    });

    describe('ToPort', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Egress();
        egress.setToPort(22);
        resource.setSecurityGroupEgress([egress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupEgress": [{
              "ToPort": 22
            }]
          }
        });
      });
    });
  });

  describe('SecurityGroupIngress', function() {
    describe('CidrIp', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setCidrIp("10.0.0.0/24");
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "CidrIp": "10.0.0.0/24"
            }]
          }
        });
      });
    });

    describe('FromPort', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setFromPort(22);
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "FromPort": 22
            }]
          }
        });
      });
    });

    describe('IpProtocol', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setIpProtocol("tcp");
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "IpProtocol": "tcp"
            }]
          }
        });
      });
    });

    describe('ToPort', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setToPort(22);
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "ToPort": 22
            }]
          }
        });
      });
    });

    describe('SourceSecurityGroupId', function() {
      it('accepts reference', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setSourceSecurityGroupId(resource);
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "SourceSecurityGroupId": {
                "Fn::GetAtt": ["MySecurityGroup", "GroupId"]
              }
            }]
          }
        });
      });

      it('accepts string', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setSourceSecurityGroupId("sg-12345678");
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "SourceSecurityGroupId": "sg-12345678"
            }]
          }
        });
      });

      it('rejects malformed string', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var egress = new cn.Ec2.SecurityGroup.Ingress();
        (function() {
          egress.setSourceSecurityGroupId("group-1234567");
        }).should.throw(/sg-/);
      });
    });

    describe('SourceSecurityGroupName', function() {
      it('accepts reference', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setSourceSecurityGroupName(resource);
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "SourceSecurityGroupName": {
                "Ref": "MySecurityGroup"
              }
            }]
          }
        });
      });

      it('accepts string', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setSourceSecurityGroupName("MySecurityGroup");
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "SourceSecurityGroupName": "MySecurityGroup"
            }]
          }
        });
      });
    });

    describe('SourceSecurityGroupOwnerId', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
        var ingress = new cn.Ec2.SecurityGroup.Ingress();
        ingress.setSourceSecurityGroupOwnerId("12345678");
        resource.setSecurityGroupIngress([ingress]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::SecurityGroup",
          "Properties": {
            "SecurityGroupIngress": [{
              "SourceSecurityGroupOwnerId": "12345678"
            }]
          }
        });
      });
    });
  });

  describe('validation', function() {
    it('should require GroupDescription', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.exist(actual);
      actual.message.should.containEql("GroupDescription");
    });

    it('should allow valid group', function() {
      var resource = new cn.Ec2.SecurityGroup("MySecurityGroup");
      resource.setGroupDescription("Example");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.not.exist(actual);
    });
  });
});
