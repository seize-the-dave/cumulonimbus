var Resource = require("./Resource").Resource;
var TaggableResource = require("./Resource").TaggableResource;

// Common Functions //
setCidrBlock = function(cidrBlock) {
  Resource.prototype.addProperty.call(this, "CidrBlock", cidrBlock);
};
setVpcId = function(vpcId) {
  if (vpcId instanceof Vpc) {
    Resource.prototype.addProperty.call(this, "VpcId", {
      "Ref": vpcId.key
    });
  } else {
    if (/^vpc-/.test(vpcId) === false) {
      throw new Error("VPC IDs should start with 'vpc-' (was " + vpcId + ")");
    } else {
      Resource.prototype.addProperty.call(this, "VpcId", vpcId);
    }
  }
};
setAvailabilityZone = function(az) {
  Resource.prototype.addProperty.call(this, "AvailabilityZone", az);
};
setSubnetId = function(subnetId) {
  if (subnetId instanceof Subnet) {
    Resource.prototype.addProperty.call(this, "SubnetId", {
      "Ref": subnetId.key
    });
  } else {
    if (/^subnet-/.test(subnetId) === false) {
      throw new Error("Subnet IDs should start with 'subnet-' (was " + subnetId + ")");
    } else {
      Resource.prototype.addProperty.call(this, "SubnetId", subnetId);
    }
  }
};

// VPC
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc.html
// vpc-
function Vpc(key) {
  Resource.call(this, key, "AWS::EC2::VPC");
}
Vpc.prototype = Object.create(TaggableResource.prototype);
Vpc.prototype.constructor = Vpc;
Vpc.prototype.setCidrBlock = setCidrBlock;
Vpc.prototype.enableDnsSupport = function(dnsSupport) {
  Resource.prototype.addProperty.call(this, "EnableDnsSupport", dnsSupport);
};
Vpc.prototype.enableDnsHostnames = function(dnsHostnames) {
  Resource.prototype.addProperty.call(this, "EnableDnsHostnames", dnsHostnames);
};
Vpc.prototype.setInstanceTenancy = function(tenancy) {
  Resource.prototype.addProperty.call(this, "InstanceTenancy", tenancy);
};
module.exports.Vpc = Vpc;

// Internet Gateway
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-internet-gateway.html
// igw-
function InternetGateway(key) {
  Resource.call(this, key, "AWS::EC2::InternetGateway");
}
InternetGateway.prototype = Object.create(TaggableResource.prototype);
InternetGateway.prototype.constructor = InternetGateway;
module.exports.InternetGateway = InternetGateway;

// Subnet
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
// subnet-
function Subnet(key) {
  Resource.call(this, key, "AWS::EC2::Subnet");
}
Subnet.prototype = Object.create(TaggableResource.prototype);
Subnet.prototype.constructor = Subnet;
Subnet.prototype.setAvailabilityZone = setAvailabilityZone;
Subnet.prototype.mapPublicIpOnLaunch = function(map) {
  Resource.prototype.addProperty.call(this, "MapPublicIpOnLaunch", map);
};
Subnet.prototype.setCidrBlock = setCidrBlock;
Subnet.prototype.setVpcId = setVpcId;
module.exports.Subnet = Subnet;

// Route Table
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route-table.html
// rtb-
function RouteTable(key) {
  Resource.call(this, key, "AWS::EC2::RouteTable");
}
RouteTable.prototype = Object.create(TaggableResource.prototype);
RouteTable.prototype.constructor = RouteTable;
RouteTable.prototype.setVpcId = setVpcId;
module.exports.RouteTable = RouteTable;

// DHCP Options
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-dhcp-options.html
// dopt-
function DhcpOptions(key) {
  Resource.call(this, key, "AWS::EC2::DHCPOptions");
}
DhcpOptions.prototype = Object.create(TaggableResource.prototype);
DhcpOptions.prototype.constructor = DhcpOptions;
DhcpOptions.prototype.setDomainName = function(domainName) {
  Resource.prototype.addProperty.call(this, "DomainName", domainName);
};
DhcpOptions.prototype.setDomainNameServers = function(nameServers) {
  Resource.prototype.addProperty.call(this, "DomainNameServers", nameServers);
};
DhcpOptions.prototype.setNetbiosNameServers = function(nameServers) {
  Resource.prototype.addProperty.call(this, "NetbiosNameServers", nameServers);
};
DhcpOptions.prototype.setNetbiosNodeType = function(nodeType) {
  Resource.prototype.addProperty.call(this, "NetbiosNodeType", nodeType);
};
DhcpOptions.prototype.setNtpServers = function(ntpServers) {
  Resource.prototype.addProperty.call(this, "NtpServers", ntpServers);
};
module.exports.DhcpOptions = DhcpOptions;

// VPC DHCP Options Association
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-dhcp-options-assoc.html
function VpcDhcpOptionsAssociation(key) {
  Resource.call(this, key, "AWS::EC2::VPCDHCPOptionsAssociation");
}
VpcDhcpOptionsAssociation.prototype = Object.create(Resource.prototype);
VpcDhcpOptionsAssociation.prototype.constructor = VpcDhcpOptionsAssociation;
VpcDhcpOptionsAssociation.prototype.setVpcId = setVpcId;
VpcDhcpOptionsAssociation.prototype.setDhcpOptionsId = function(dhcpOptionId) {
  if (dhcpOptionId instanceof DhcpOptions) {
    Resource.prototype.addProperty.call(this, "DhcpOptionsId", {
      "Ref": dhcpOptionId.key
    });
  } else {
    if (/^dopt-/.test(dhcpOptionId) === false) {
      throw new Error("DHCPOptions IDs should start with 'dopt-' (was " + dhcpOptionId + ")")
    } else {
      Resource.prototype.addProperty.call(this, "DhcpOptionsId", dhcpOptionId);
    }
  }
};
module.exports.VpcDhcpOptionsAssociation = VpcDhcpOptionsAssociation;

// Subnet Route Table Association
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet-route-table-assoc.html
function SubnetRouteTableAssociation(key) {
  Resource.call(this, key, "AWS::EC2::SubnetRouteTableAssociation");
}
SubnetRouteTableAssociation.prototype = Object.create(Resource.prototype);
SubnetRouteTableAssociation.prototype.constructor = SubnetRouteTableAssociation;
SubnetRouteTableAssociation.prototype.setSubnetId = setSubnetId;
SubnetRouteTableAssociation.prototype.setRouteTableId = function(routeTableId) {
  if (routeTableId instanceof RouteTable) {
    Resource.prototype.addProperty.call(this, "RouteTableId", {
      "Ref": routeTableId.key
    });
  } else {
    if (/^rtb-/.test(routeTableId) === false) {
      throw new Error("RouteTable IDs should start with 'rtb-' (was " + routeTableId + ")");
    } else {
      Resource.prototype.addProperty.call(this, "RouteTableId", routeTableId);
    }
  }
};
module.exports.SubnetRouteTableAssociation = SubnetRouteTableAssociation;

// VPN Gateway
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpn-gateway.html
// vgw-
function VpnGateway(key) {
  Resource.call(this, key, "AWS::EC2::VPNGateway");
  Resource.prototype.addProperty.call(this, "Type", "ipsec.1");
}
VpnGateway.prototype = Object.create(TaggableResource.prototype);
VpnGateway.prototype.constructor = VpnGateway;
module.exports.VpnGateway = VpnGateway;


// VPC Gateway Attachment
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html
function VpcGatewayAttachment(key) {
  Resource.call(this, key, "AWS::EC2::VPCGatewayAttachment");
}
VpcGatewayAttachment.prototype = Object.create(Resource.prototype);
VpcGatewayAttachment.prototype.constructor = VpcGatewayAttachment;
VpcGatewayAttachment.prototype.setVpcId = setVpcId;
VpcGatewayAttachment.prototype.setInternetGatewayId = function(gatewayId) {
  if (gatewayId instanceof InternetGateway) {
    Resource.prototype.addProperty.call(this, "InternetGatewayId", {
      "Ref": gatewayId.key
    });
  } else {
    if (/^igw-/.test(gatewayId) === false) {
      throw new Error("Internet Gateway IDs should start with 'igw-' (was " + gatewayId + ")");
    } else {
      Resource.prototype.addProperty.call(this, "InternetGatewayId", gatewayId);
    }
  }
};
VpcGatewayAttachment.prototype.setVpnGatewayId = function(gatewayId) {
  if (gatewayId instanceof VpnGateway) {
    Resource.prototype.addProperty.call(this, "VpnGatewayId", {
      "Ref": gatewayId.key
    });
  } else {
    if (/^vgw-/.test(gatewayId) === false) {
      throw new Error("VPN Gateway IDs should start with 'vgw-' (was " + gatewayId + ")");
    } else {
      Resource.prototype.addProperty.call(this, "VpnGatewayId", gatewayId);
    }
  }
};
module.exports.VpcGatewayAttachment = VpcGatewayAttachment;

// AWS::EC2::Instance
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html
function Instance(key) {
  Resource.call(this, key, "AWS::EC2::Instance");
}
Instance.prototype = Object.create(TaggableResource.prototype);
Instance.prototype.constructor = Instance;
Instance.prototype.setAvailabilityZone = setAvailabilityZone;
Instance.prototype.setBlockDeviceMappings = function(deviceMappings) {
  Resource.prototype.addProperty.call(this, "BlockDeviceMappings", deviceMappings);
};
Instance.prototype.disableApiTermination = function(apiTermination) {
  Resource.prototype.addProperty.call(this, "DisableApiTermination", apiTermination);
};
Instance.prototype.setEbsOptimized = function(ebsOptimized) {
  Resource.prototype.addProperty.call(this, "EbsOptimized", ebsOptimized);
};
Instance.prototype.setImageId = function(imageId) {
  if (/^ami-/.test(imageId) === false) {
    throw new Error("AMI Ids should start with ami- was (" + imageId + ")");
  }
  Resource.prototype.addProperty.call(this, "ImageId", imageId);
};
Instance.prototype.setInstanceInitiatedShutdownBehavior = function(behaviour) {
  if (behaviour !== "stop" && behaviour != "terminate") {
    throw new Error("Behaviour should be 'stop'");
  }
  Resource.prototype.addProperty.call(this, "InstanceInitiatedShutdownBehavior", behaviour);
};
Instance.prototype.setInstanceType = function(type) {
  Resource.prototype.addProperty.call(this, "InstanceType", type);
};
Instance.prototype.setKernelId = function(kernel) {
  if (/^aki-/.test(kernel) === false) {
    throw new Error("Kernel IDs should start with aki- (was " + kernel + ")");
  }
  Resource.prototype.addProperty.call(this, "KernelId", kernel);
};
Instance.prototype.setKeyName = function(name) {
  Resource.prototype.addProperty.call(this, "KeyName", name);
};
Instance.prototype.setMonitoring = function(monitoring) {
  Resource.prototype.addProperty.call(this, "Monitoring", monitoring);
};
Instance.prototype.setPrivateIpAddress = function(ipAddress) {
  Resource.prototype.addProperty.call(this, "PrivateIpAddress", ipAddress);
};
Instance.prototype.setRamdiskId = function(diskId) {
  if (/^ari-/.test(diskId) === false) {
    throw new Error("RAM disk IDs should start with ari- (was " + diskId + ")");
  }
  Resource.prototype.addProperty.call(this, "RamdiskId", diskId);
};
Instance.prototype.setSourceDestCheck = function(check) {
  Resource.prototype.addProperty.call(this, "SourceDestCheck", check);
};
Instance.prototype.setSubnetId = setSubnetId;
Instance.prototype.setTenancy = function(tenancy) {
  if (tenancy !== "default" && tenancy !== "dedicated") {
    throw new Error("Tenancy must be 'default' or 'dedicated'");
  }
  Resource.prototype.addProperty.call(this, "Tenancy", tenancy);
};
module.exports.Instance = Instance;

// AWS::EC2::Instance::BlockDeviceMapping
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html#cfn-ec2-instance-blockdevicemappings
function BlockDeviceMapping() {}
BlockDeviceMapping.prototype.constructor = BlockDeviceMapping;
BlockDeviceMapping.prototype.setDeviceName = function(deviceName) {
  this.DeviceName = deviceName;
};
BlockDeviceMapping.prototype.setEbs = function(blockStore) {
  this.Ebs = blockStore;
};
BlockDeviceMapping.prototype.setNoDevice = function() {
  this.NoDevice = {};
};
BlockDeviceMapping.prototype.setVirtualName = function(virtualName) {
  if (/^ephemeral[0-9]+$/.test(virtualName) === false) {
    throw new Error("Virtual Name should be in the form ephemeralX, where X is a number");
  }
  this.VirtualName = virtualName;
};
module.exports.Instance.BlockDeviceMapping = BlockDeviceMapping;

// AWS::EC2::Instance::BlockDeviceMapping::BlockStore
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-blockdev-template.html
function BlockStore() {}
BlockStore.prototype.constructor = BlockStore;
BlockStore.prototype.deleteOnTermination = function(deleteOnTermination) {
  this.DeleteOnTermination = deleteOnTermination;
};
BlockStore.prototype.setEncrypted = function(encrypted) {
  this.Encrypted = encrypted;
};
BlockStore.prototype.setIops = function(iops) {
  this.Iops = iops;
};
BlockStore.prototype.setSnapshotId = function(snapshot) {
  if (/^snap-/.test(snapshot) === false) {
    throw new Error("Snapshot IDs should start with 'snap-' (was " + snapshot + ")");
  } else {
    this.SnapshotId = snapshot;
  }
};
BlockStore.prototype.setVolumeSize = function(size) {
  this.VolumeSize = size;
};
BlockStore.prototype.setVolumeType = function(type) {
  if (type !== "standard" && type !== "io1" && type !== "gp2") {
    throw new Error("VolumeType should equal 'standard', 'io1' or 'gp2'");
  }
  this.VolumeType = type;
};
module.exports.Instance.BlockDeviceMapping.BlockStore = BlockStore;

// AWS::EC2::SecurityGroup
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html
// sg-
function SecurityGroup(key) {
  Resource.call(this, key, "AWS::EC2::SecurityGroup");
}
SecurityGroup.prototype = Object.create(TaggableResource.prototype);
SecurityGroup.prototype.constructor = SecurityGroup;
SecurityGroup.prototype.setGroupDescription = function(description) {
  Resource.prototype.addProperty.call(this, "GroupDescription", description);
};
SecurityGroup.prototype.setSecurityGroupEgress = function(egress) {
  Resource.prototype.addProperty.call(this, "SecurityGroupEgress", egress);
};
SecurityGroup.prototype.setSecurityGroupIngress = function(ingress) {
  Resource.prototype.addProperty.call(this, "SecurityGroupIngress", ingress);
};
SecurityGroup.prototype.setVpcId = setVpcId;
module.exports.SecurityGroup = SecurityGroup;

function Rule() {

}
Rule.prototype.constructor = Rule;
Rule.prototype.setCidrIp = function(cidrIp) {
  this.CidrIp = cidrIp;
};
Rule.prototype.setFromPort = function(port) {
  this.FromPort = port;
};
Rule.prototype.setIpProtocol = function(protocol) {
  this.IpProtocol = protocol;
};
Rule.prototype.setToPort = function(port) {
  this.ToPort = port;
};

function Egress() {
  Rule.call(this);
}
Egress.prototype = Object.create(Rule.prototype);
Egress.prototype.constructor = Egress;
Egress.prototype.setDestinationSecurityGroupId = function(groupId) {
  if (groupId instanceof SecurityGroup) {
    this.DestinationSecurityGroupId = {
      "Ref": groupId.key
    };
  } else if (typeof groupId === "string") {
    if (/^sg-/.test(groupId) === false) {
      throw new Error("Security Group IDs should begin with sg- (was" + groupId + ")");
    } else {
      this.DestinationSecurityGroupId = groupId;
    }
  }
};
module.exports.SecurityGroup.Egress = Egress;

function Ingress() {
  Rule.call(this);
}
Ingress.prototype = Object.create(Rule.prototype);
Ingress.prototype.constructor = Ingress;
Ingress.prototype.setSourceSecurityGroupId = function(groupId) {
  if (groupId instanceof SecurityGroup) {
    this.SourceSecurityGroupId = {
      "Ref": groupId.key
    };
  } else if (typeof groupId === "string") {
    if (/^sg-/.test(groupId) === false) {
      throw new Error("Security Group IDs should begin with sg- (was" + groupId + ")");
    } else {
      this.SourceSecurityGroupId = groupId;
    }
  }
};
Ingress.prototype.setSourceSecurityGroupName = function(name) {
  if (name instanceof SecurityGroup) {
    this.SourceSecurityGroupName = {
      "Ref": name.key
    };
  } else if (typeof name === "string") {
    this.SourceSecurityGroupName = name;
  }
};
Ingress.prototype.setSourceSecurityGroupOwnerId = function(ownerId) {
  this.SourceSecurityGroupOwnerId = ownerId;
};
module.exports.SecurityGroup.Ingress = Ingress;
