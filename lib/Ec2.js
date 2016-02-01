var Resource = require("./Resource").Resource;
var TaggableResource = require("./Resource").TaggableResource;
var inherits = require("util").inherits;

// Common Functions //
setCidrBlock = function(cidrBlock) {
  this.addProperty("CidrBlock", cidrBlock);
};
parseResourceId = function(prefix, name, parameter, type) {
  if (parameter instanceof type) {
    return parameter.getRef();
  } else {
    return filterResourceId(prefix, name, parameter);
  }
};
filterResourceId = function(prefix, name, parameter) {
  if (new RegExp("^" + prefix + "-([0-9a-f]{8}|[0-9a-f]{17})$").test(parameter) === false) {
    throw new Error(name + " resource IDs should be " + prefix + "- followed by 8 or 17 hexidecimal characters was (" + parameter + ")");
  } else {
    return parameter;
  }
};
parseVpcId = function(vpcId) {
  return parseResourceId("vpc", "VPC", vpcId, Vpc);
};
setVpcId = function(vpcId) {
  this.addProperty("VpcId", parseVpcId(vpcId));
};
setAvailabilityZone = function(az) {
  this.addProperty("AvailabilityZone", az);
};
setSubnetId = function(subnetId) {
  this.addProperty("SubnetId", parseResourceId("subnet", "Subnet", subnetId, Subnet));
};
parseSecurityGroups = function(groupId, parser) {
  if (Array.isArray(groupId)) {
    var groups = [];
    for (var i = 0; i < groupId.length; i++) {
      groups[i] = parser(groupId[i]);
    }
    return groups;
  } else {
    return [parser(groupId)];
  }
};
parseSecurityGroupId = function(groupId) {
  return parseResourceId("sg", "Security Group", groupId, SecurityGroup);
};
parseSecurityGroupName = function(name) {
  if (name instanceof SecurityGroup) {
    return name.getRef();
  } else {
    return name;
  }
};

// VPC
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc.html
// vpc-
function Vpc(key) {
  Resource.call(this, key, "AWS::EC2::VPC");
}
inherits(Vpc, TaggableResource);
module.exports.Vpc = Vpc;

Vpc.prototype.setCidrBlock = setCidrBlock;
Vpc.prototype.enableDnsSupport = function(dnsSupport) {
  this.addProperty("EnableDnsSupport", dnsSupport);
};
Vpc.prototype.enableDnsHostnames = function(dnsHostnames) {
  this.addProperty("EnableDnsHostnames", dnsHostnames);
};
Vpc.prototype.setInstanceTenancy = function(tenancy) {
  this.addProperty("InstanceTenancy", tenancy);
};
Vpc.prototype.validate = function(collect) {
  if (this.properties.CidrBlock === undefined) {
    collect(this.toError("CidrBlock is required."));
  }
};

// Internet Gateway
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-internet-gateway.html
// igw-
function InternetGateway(key) {
  Resource.call(this, key, "AWS::EC2::InternetGateway");
}
inherits(InternetGateway, TaggableResource);
module.exports.InternetGateway = InternetGateway;

// Subnet
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
// subnet-
function Subnet(key) {
  Resource.call(this, key, "AWS::EC2::Subnet");
}
inherits(Subnet, TaggableResource);
module.exports.Subnet = Subnet;

Subnet.prototype.setAvailabilityZone = setAvailabilityZone;
Subnet.prototype.mapPublicIpOnLaunch = function(map) {
  this.addProperty("MapPublicIpOnLaunch", map);
};
Subnet.prototype.setCidrBlock = setCidrBlock;
Subnet.prototype.setVpcId = setVpcId;
Subnet.prototype.validate = function(collect) {
  this.checkProperties(["CidrBlock", "VpcId"], collect);
};

// Route Table
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-route-table.html
// rtb-
function RouteTable(key) {
  Resource.call(this, key, "AWS::EC2::RouteTable");
}
inherits(RouteTable, TaggableResource);
module.exports.RouteTable = RouteTable;

RouteTable.prototype.setVpcId = setVpcId;
RouteTable.prototype.validate = function(collect) {
  this.checkProperty("VpcId", collect);
};

// DHCP Options
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-dhcp-options.html
// dopt-
function DhcpOptions(key) {
  Resource.call(this, key, "AWS::EC2::DHCPOptions");
}
inherits(DhcpOptions, TaggableResource);
module.exports.DhcpOptions = DhcpOptions;

DhcpOptions.prototype.setDomainName = function(domainName) {
  this.addProperty("DomainName", domainName);
};
DhcpOptions.prototype.setDomainNameServers = function(nameServers) {
  this.addProperty("DomainNameServers", nameServers);
};
DhcpOptions.prototype.setNetbiosNameServers = function(nameServers) {
  this.addProperty("NetbiosNameServers", nameServers);
};
DhcpOptions.prototype.setNetbiosNodeType = function(nodeType) {
  this.addProperty("NetbiosNodeType", nodeType);
};
DhcpOptions.prototype.setNtpServers = function(ntpServers) {
  this.addProperty("NtpServers", ntpServers);
};
DhcpOptions.prototype.validate = function(collect) {
  if (this.properties.NetbiosNameServers !== undefined) {
    if (this.properties.NetbiosNodeType === undefined) {
      collect(this.toError("If you specify NetbiosNameServers, then NetbiosNodeType is required."));
    }
  } else {
    if (this.properties.DomainNameServers === undefined && this.properties.NtpServers === undefined) {
      collect(this.toError("At least one of the DomainNameServers, NetbiosNameServers and NtpServers must be specified."))
    }
  }
};

// VPC DHCP Options Association
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-dhcp-options-assoc.html
function VpcDhcpOptionsAssociation(key) {
  Resource.call(this, key, "AWS::EC2::VPCDHCPOptionsAssociation");
}
inherits(VpcDhcpOptionsAssociation, Resource);
module.exports.VpcDhcpOptionsAssociation = VpcDhcpOptionsAssociation;

VpcDhcpOptionsAssociation.prototype.setVpcId = setVpcId;
VpcDhcpOptionsAssociation.prototype.setDhcpOptionsId = function(dhcpOptionId) {
  this.addProperty("DhcpOptionsId", parseResourceId("dopt", "DHCP Options", dhcpOptionId, DhcpOptions));
};
VpcDhcpOptionsAssociation.prototype.validate = function(collect) {
  this.checkProperties(["DhcpOptionsId", "VpcId"], collect);
};

// Subnet Route Table Association
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet-route-table-assoc.html
function SubnetRouteTableAssociation(key) {
  Resource.call(this, key, "AWS::EC2::SubnetRouteTableAssociation");
}
inherits(SubnetRouteTableAssociation, Resource);
module.exports.SubnetRouteTableAssociation = SubnetRouteTableAssociation;

SubnetRouteTableAssociation.prototype.setSubnetId = setSubnetId;
SubnetRouteTableAssociation.prototype.setRouteTableId = function(routeTableId) {
  this.addProperty("RouteTableId", parseResourceId("rtb", "Route Table", routeTableId, RouteTable));
};
SubnetRouteTableAssociation.prototype.validate = function(collect) {
  this.checkProperties(["RouteTableId", "SubnetId"], collect);
};

// VPN Gateway
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpn-gateway.html
// vgw-
function VpnGateway(key) {
  Resource.call(this, key, "AWS::EC2::VPNGateway");
  this.addProperty("Type", "ipsec.1");
}
inherits(VpnGateway, TaggableResource);
module.exports.VpnGateway = VpnGateway;

// VPC Gateway Attachment
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html
function VpcGatewayAttachment(key) {
  Resource.call(this, key, "AWS::EC2::VPCGatewayAttachment");
}
inherits(VpcGatewayAttachment, Resource);
module.exports.VpcGatewayAttachment = VpcGatewayAttachment;

VpcGatewayAttachment.prototype.setVpcId = setVpcId;
VpcGatewayAttachment.prototype.setInternetGatewayId = function(gatewayId) {
  this.addProperty("InternetGatewayId", parseResourceId("igw", "Internet Gateway", gatewayId, InternetGateway));
};
VpcGatewayAttachment.prototype.setVpnGatewayId = function(gatewayId) {
  this.addProperty("VpnGatewayId", parseResourceId("vgw", "VPN Gateway", gatewayId, VpnGateway));
};
VpcGatewayAttachment.prototype.validate = function(collect) {
  if ((this.properties.InternetGatewayId !== undefined) === (this.properties.VpnGatewayId !== undefined)) {
    collect(this.toError("You must specify either InternetGatewayId or VpnGatewayId, but not both."));
  }
  this.checkProperty("VpcId", collect);
};

// AWS::EC2::Instance
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html
// i-
function Instance(key) {
  Resource.call(this, key, "AWS::EC2::Instance");
}
inherits(Instance, TaggableResource);
module.exports.Instance = Instance;

Instance.prototype.setAvailabilityZone = setAvailabilityZone;
Instance.prototype.setBlockDeviceMappings = function(deviceMappings) {
  this.addProperty("BlockDeviceMappings", deviceMappings);
};
Instance.prototype.disableApiTermination = function(apiTermination) {
  this.addProperty("DisableApiTermination", apiTermination);
};
Instance.prototype.setEbsOptimized = function(ebsOptimized) {
  this.addProperty("EbsOptimized", ebsOptimized);
};
Instance.prototype.setImageId = function(imageId) {
  this.addProperty("ImageId", filterResourceId("ami", "AMI", imageId));
};
Instance.prototype.setInstanceInitiatedShutdownBehavior = function(behaviour) {
  if (behaviour !== "stop" && behaviour !== "terminate") {
    throw new Error("Behaviour should be 'stop'");
  }
  this.addProperty("InstanceInitiatedShutdownBehavior", behaviour);
};
Instance.prototype.setInstanceType = function(type) {
  this.addProperty("InstanceType", type);
};
Instance.prototype.setKernelId = function(kernel) {
  this.addProperty("KernelId", filterResourceId("aki", "Kernel", kernel));
};
Instance.prototype.setKeyName = function(name) {
  this.addProperty("KeyName", name);
};
Instance.prototype.setMonitoring = function(monitoring) {
  this.addProperty("Monitoring", monitoring);
};
Instance.prototype.setPrivateIpAddress = function(ipAddress) {
  this.addProperty("PrivateIpAddress", ipAddress);
};
Instance.prototype.setRamdiskId = function(diskId) {
  this.addProperty("RamdiskId", filterResourceId("ari", "RAM disk", diskId));
};
Instance.prototype.setSecurityGroupIds = function(groups) {
  this.addProperty("SecurityGroupIds", parseSecurityGroups(groups, parseSecurityGroupId));
};
Instance.prototype.setSecurityGroups = function(groups) {
  this.addProperty("SecurityGroups", parseSecurityGroups(groups, parseSecurityGroupName));
};
Instance.prototype.setSourceDestCheck = function(check) {
  this.addProperty("SourceDestCheck", check);
};
Instance.prototype.setSubnetId = setSubnetId;
Instance.prototype.setTenancy = function(tenancy) {
  if (tenancy !== "default" && tenancy !== "dedicated") {
    throw new Error("Tenancy must be 'default' or 'dedicated'");
  }
  this.addProperty("Tenancy", tenancy);
};
Instance.prototype.validate = function(collect) {
  this.checkProperty("ImageId", collect);
};

// AWS::EC2::Instance::BlockDeviceMapping
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html#cfn-ec2-instance-blockdevicemappings
function BlockDeviceMapping() {}
module.exports.Instance.BlockDeviceMapping = BlockDeviceMapping;

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

// AWS::EC2::Instance::BlockDeviceMapping::BlockStore
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-blockdev-template.html
function BlockStore() {}
module.exports.Instance.BlockDeviceMapping.BlockStore = BlockStore;

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
  this.SnapshotId = filterResourceId("snap", "Snapshot", snapshot);
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

// AWS::EC2::SecurityGroup
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html
// sg-
function SecurityGroup(key) {
  Resource.call(this, key, "AWS::EC2::SecurityGroup");
}
inherits(SecurityGroup, TaggableResource);
module.exports.SecurityGroup = SecurityGroup;

SecurityGroup.prototype.setGroupDescription = function(description) {
  this.addProperty("GroupDescription", description);
};
SecurityGroup.prototype.setSecurityGroupEgress = function(egress) {
  this.addProperty("SecurityGroupEgress", egress);
};
SecurityGroup.prototype.setSecurityGroupIngress = function(ingress) {
  this.addProperty("SecurityGroupIngress", ingress);
};
SecurityGroup.prototype.setVpcId = setVpcId;
SecurityGroup.prototype.validate = function(collect) {
  this.checkProperty("GroupDescription", collect);
};

function Rule() {}

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
inherits(Egress, Rule);
module.exports.SecurityGroup.Egress = Egress;

Egress.prototype.setDestinationSecurityGroupId = function(groupId) {
  this.DestinationSecurityGroupId = parseSecurityGroupId(groupId);
};

function Ingress() {
  Rule.call(this);
}
inherits(Ingress, Rule);
module.exports.SecurityGroup.Ingress = Ingress;

Ingress.prototype.setSourceSecurityGroupId = function(groupId) {
  this.SourceSecurityGroupId = parseSecurityGroupId(groupId);
};
Ingress.prototype.setSourceSecurityGroupName = function(name) {
  this.SourceSecurityGroupName = parseSecurityGroupName(name);
};
Ingress.prototype.setSourceSecurityGroupOwnerId = function(ownerId) {
  this.SourceSecurityGroupOwnerId = ownerId;
};

// VPC Gateway Attachment
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html
function VpcPeeringConnection(key) {
  Resource.call(this, key, "AWS::EC2::VPCPeeringConnection");
}
inherits(VpcPeeringConnection, TaggableResource);
module.exports.VpcPeeringConnection = VpcPeeringConnection;

VpcPeeringConnection.prototype.setVpcId = setVpcId;
VpcPeeringConnection.prototype.setVpcId = setVpcId;
VpcPeeringConnection.prototype.setPeerVpcId = function(vpcId) {
  this.addProperty("PeerVpcId", parseVpcId(vpcId));
};
VpcPeeringConnection.prototype.validate = function(collect) {
  this.checkProperties(["VpcId", "PeerVpcId"], collect);
};

// Elastic IP
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc-gateway-attachment.html
function Eip(key) {
  Resource.call(this, key, "AWS::EC2::EIP");
}
inherits(Eip, Resource);
module.exports.Eip = Eip;

Eip.prototype.setDomain = function(domain) {
  if (domain !== "vpc") {
    throw new Error("Domain must equal 'vpc'.");
  }
  this.addProperty("Domain", domain);
};
Eip.prototype.setInstanceId = function(instanceId) {
  this.addProperty("InstanceId", parseResourceId("i", "Instance", instanceId, Instance));
};

// Elastic IP Association
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-eip-association.html
function EipAssociation(key) {
  Resource.call(this, key, "AWS::EC2::EIPAssociation");
}
inherits(EipAssociation, Resource);
module.exports.EipAssociation = EipAssociation;

EipAssociation.prototype.setAllocationId = function(eip) {
  if (eip instanceof Eip) {
    this.addProperty("AllocationId", eip.getAtt("AllocationId"));
  } else {
    this.addProperty("AllocationId", filterResourceId("eipalloc", "EIP Allocation", eip));
  }
};
EipAssociation.prototype.setEip = function(eip) {
  if (eip instanceof Eip) {
    this.addProperty("EIP", eip.getRef());
  } else {
    this.addProperty("EIP", eip);
  }
};
EipAssociation.prototype.setInstanceId = function(instanceId) {
  this.addProperty("InstanceId", parseResourceId("i", "Instance", instanceId, Instance));
};
EipAssociation.prototype.setNetworkInterfaceId = function(interfaceId) {
  this.addProperty("NetworkInterfaceId", filterResourceId("eni", "Network Interface", interfaceId));
};
EipAssociation.prototype.setPrivateIpAddress = function(ipAddress) {
  this.addProperty("PrivateIpAddress", ipAddress);
};

// AWS::EC2::PlacementGroup
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-placementgroup.html
function PlacementGroup(key) {
  Resource.call(this, key, "AWS::EC2::PlacementGroup");
  this.addProperty("Strategy", "cluster");
}
inherits(PlacementGroup, Resource);
module.exports.PlacementGroup = PlacementGroup;
