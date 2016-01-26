var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::EC2::Instance', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.Instance("Instance");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance"
      });
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.addTag("Name", "Instance");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "Tags": {
            "Name": "Instance"
          }
        }
      });
    });
  });

  describe('AvailabilityZone', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setAvailabilityZone("us-east-1a");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "AvailabilityZone": "us-east-1a"
        }
      });
    });
  });

  describe('BlockDeviceMappings', function() {
    describe('DeviceName', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.Instance("Instance");
        var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
        bdm.setDeviceName("Example");
        resource.setBlockDeviceMappings([bdm]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::Instance",
          "Properties": {
            "BlockDeviceMappings": [{
              "DeviceName": "Example"
            }]
          }
        });
      });
    });
    describe('Ebs', function() {
      describe('DeleteOnTermination', function() {
        it('should be present in the JSON output', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.deleteOnTermination(true);
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "DeleteOnTermination": true
                }
              }]
            }
          });
        });
      });

      describe('Encrypted', function() {
        it('should be present in the JSON output', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.setEncrypted(true);
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "Encrypted": true
                }
              }]
            }
          });
        });
      });

      describe('Iops', function() {
        it('should be present in the JSON output', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.setIops(100);
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "Iops": 100
                }
              }]
            }
          });
        });
      });

      describe('SnapshotId', function() {
        it('accepts string', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.setSnapshotId("snap-1234567");
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "SnapshotId": "snap-1234567"
                }
              }]
            }
          });
        });
        it('rejected malformed string', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          should.throws(function() {
            ebs.setSnapshotId("snp-1234567");
          });
        });
      });

      describe('VolumeSize', function() {
        it('should be present in the JSON output', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.setVolumeSize(100);
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "VolumeSize": 100
                }
              }]
            }
          });
        });
      });

      describe('VolumeType', function() {
        it('accepts standard', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.setVolumeType("standard");
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "VolumeType": "standard"
                }
              }]
            }
          });
        });

        it('accepts io1', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.setVolumeType("io1");
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "VolumeType": "io1"
                }
              }]
            }
          });
        });

        it('accepts gp2', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          ebs.setVolumeType("gp2");
          bdm.setEbs(ebs);
          resource.setBlockDeviceMappings([bdm]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::EC2::Instance",
            "Properties": {
              "BlockDeviceMappings": [{
                "Ebs": {
                  "VolumeType": "gp2"
                }
              }]
            }
          });
        });

        it('rejects malformed value', function() {
          var resource = new cn.Ec2.Instance("Instance");
          var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
          var ebs = new cn.Ec2.Instance.BlockDeviceMapping.BlockStore();
          should.throws(function() {
            ebs.setVolumeType("foo");
          });
        });
      });
    });
    describe('NoDevice', function() {
      it('should be present in the JSON output', function() {
        var resource = new cn.Ec2.Instance("Instance");
        var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
        bdm.setNoDevice();
        resource.setBlockDeviceMappings([bdm]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::Instance",
          "Properties": {
            "BlockDeviceMappings": [{
              "NoDevice": {}
            }]
          }
        });
      });
    });

    describe('VirtualName', function() {
      it('accepts valid name', function() {
        var resource = new cn.Ec2.Instance("Instance");
        var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
        bdm.setVirtualName("ephemeral0");
        resource.setBlockDeviceMappings([bdm]);
        should(resource.toJson()).deepEqual({
          "Type": "AWS::EC2::Instance",
          "Properties": {
            "BlockDeviceMappings": [{
              "VirtualName": "ephemeral0"
            }]
          }
        });
      });

      it('rejects malformed name', function() {
        var resource = new cn.Ec2.Instance("Instance");
        var bdm = new cn.Ec2.Instance.BlockDeviceMapping();
        should.throws(function() {
          bdm.setVirtualName("virtual0");
        });
      });
    });
  });

  describe('DisableApiTermination', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.disableApiTermination(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "DisableApiTermination": true
        }
      });
    });
  });

  describe('EbsOptimized', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setEbsOptimized(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "EbsOptimized": true
        }
      });
    });
  });

  describe('ImageId', function() {
    it('accepts valid AMI', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setImageId("ami-1234567");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "ImageId": "ami-1234567"
        }
      });
    });
    it('reject malformed AMI', function() {
      var resource = new cn.Ec2.Instance("Instance");
      should.throws(function() {
        resource.setImageId("img-1234567");
      });
    });
  });

  describe('InstanceInitiatedShutdownBehavior', function() {
    it('accepts stop', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setInstanceInitiatedShutdownBehavior("stop");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "InstanceInitiatedShutdownBehavior": "stop"
        }
      });
    });

    it('accepts terminate', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setInstanceInitiatedShutdownBehavior("terminate");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "InstanceInitiatedShutdownBehavior": "terminate"
        }
      });
    });

    it('rejects invalid values', function() {
      var resource = new cn.Ec2.Instance("Instance");
      should.throws(function() {
        resource.setInstanceInitiatedShutdownBehavior("woah!");
      });
    });
  });

  describe('InstanceType', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setInstanceType("t2.micro");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "InstanceType": "t2.micro"
        }
      });
    });
  });

  describe('KernelId', function() {
    it('accepts valid kernel ID', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setKernelId("aki-6a0cf803");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "KernelId": "aki-6a0cf803"
        }
      });
    });

    it('reject invalid kernel ID', function() {
      var resource = new cn.Ec2.Instance("Instance");
      should.throws(function() {
        resource.setKernelId("kernel-6a0cf803");
      });
    });
  });

  describe('KeyName', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setKeyName("key");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "KeyName": "key"
        }
      });
    });
  });

  describe('Monitoring', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setMonitoring(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "Monitoring": true
        }
      });
    });
  });

  describe('PrivateIpAddress', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setPrivateIpAddress("10.0.0.1");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "PrivateIpAddress": "10.0.0.1"
        }
      });
    });
  });

  describe('RamdiskId', function() {
    it('accepts valid Ramdisk ID', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setRamdiskId("ari-aa6348de");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "RamdiskId": "ari-aa6348de"
        }
      });
    });

    it('rejects malformed Ramdisk ID', function() {
      var resource = new cn.Ec2.Instance("Instance");
      should.throws(function() {
        resource.setRamdiskId("disk-aa6348de");
      });
    });
  });

  describe('SecurityGroupIds', function() {
    it('accepts single reference', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      resource.setSecurityGroupIds(sg_one);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroupIds": [{
            "Ref": "MySecurityGroup1"
          }]
        }
      });
    });

    it('accepts single string', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      resource.setSecurityGroupIds("sg-1234567");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroupIds": ["sg-1234567"]
        }
      });
    });

    it('rejects single malformed string', function() {
      var resource = new cn.Ec2.Instance("Instance");
      should.throws(function() {
        resource.setSecurityGroupIds("group-1234567");
      });
    });

    it('accepts multiple references', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      var sg_two = new cn.Ec2.SecurityGroup("MySecurityGroup2");
      resource.setSecurityGroupIds([sg_one, sg_two]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroupIds": [{
            "Ref": "MySecurityGroup1"
          }, {
            "Ref": "MySecurityGroup2"
          }, ]
        }
      });
    });

    it('accepts multiple strings', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      resource.setSecurityGroupIds(["sg-1234567", "sg-2345678"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroupIds": ["sg-1234567", "sg-2345678"]
        }
      });
    });

    it('rejects multiple malformed strings', function() {
      var resource = new cn.Ec2.Instance("Instance");
      should.throws(function() {
        resource.setSecurityGroupIds(["group-1234567", "group-2345678"]);
      });
    });

    it('accepts multiple mixed types', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      resource.setSecurityGroupIds(["sg-1234567", sg_one]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroupIds": ["sg-1234567", {
            "Ref": "MySecurityGroup1"
          }]
        }
      });
    });
  });

  describe('SecurityGroups', function() {
    it('accepts single reference', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      resource.setSecurityGroups(sg_one);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroups": [{
            "Ref": "MySecurityGroup1"
          }]
        }
      });
    });

    it('accepts single string', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      resource.setSecurityGroups("MySecurityGroup1");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroups": ["MySecurityGroup1"]
        }
      });
    });

    it('accepts multiple references', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      var sg_two = new cn.Ec2.SecurityGroup("MySecurityGroup2");
      resource.setSecurityGroups([sg_one, sg_two]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroups": [{
            "Ref": "MySecurityGroup1"
          }, {
            "Ref": "MySecurityGroup2"
          }, ]
        }
      });
    });

    it('accepts multiple strings', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setSecurityGroups(["MySecurityGroup1", "MySecurityGroup2"]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroups": ["MySecurityGroup1", "MySecurityGroup2"]
        }
      });
    });

    it('accepts multiple mixed types', function() {
      var resource = new cn.Ec2.Instance("Instance");
      var sg_one = new cn.Ec2.SecurityGroup("MySecurityGroup1");
      resource.setSecurityGroups(["MySecurityGroup1", sg_one]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SecurityGroups": ["MySecurityGroup1", {
            "Ref": "MySecurityGroup1"
          }]
        }
      });
    });
  });

  describe('SourceDestCheck', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("Instance");
      resource.setSourceDestCheck(true);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SourceDestCheck": true
        }
      });
    });
  });

  describe('SubnetId', function() {
    it('accepts reference', function() {
      var subnet = new cn.Ec2.Subnet("MySubnet");
      var resource = new cn.Ec2.Instance("MyInstance");
      resource.setSubnetId(subnet);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SubnetId": {
            "Ref": "MySubnet"
          }
        }
      });
    });

    it('accepts string', function() {
      var resource = new cn.Ec2.Instance("MyInstance");
      resource.setSubnetId("subnet-123456");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "SubnetId": "subnet-123456"
        }
      });
    });

    it('rejected malformed string', function() {
      var resource = new cn.Ec2.Instance("MyInstance");
      should.throws(function() {
        resource.setSubnetId("net-123456");
      });
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.Instance("MyInstance");
      resource.addTag("Name", "MyInstance");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "Tags": {
            "Name": "MyInstance"
          }
        }
      });
    });
  });

  describe('Tenancy', function() {
    it('accepts default', function() {
      var resource = new cn.Ec2.Instance("MyInstance");
      resource.setTenancy("default");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "Tenancy": "default"
        }
      });
    });

    it('accepts dedicated', function() {
      var resource = new cn.Ec2.Instance("MyInstance");
      resource.setTenancy("dedicated");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::Instance",
        "Properties": {
          "Tenancy": "dedicated"
        }
      });
    });

    it('rejects malformed value', function() {
      var resource = new cn.Ec2.Instance("MyInstance");
      should.throws(function() {
        resource.setTenancy("malformed");
      });
    });
  });
});
