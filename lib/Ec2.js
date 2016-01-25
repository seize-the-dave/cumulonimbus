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
InternetGateway.prototype.constructor = Subnet;
module.exports.InternetGateway = InternetGateway;

// Subnet
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
// subnet-
function Subnet(key) {
  Resource.call(this, key, "AWS::EC2::Subnet");
}
Subnet.prototype = Object.create(TaggableResource.prototype);
Subnet.prototype.constructor = Subnet;
Subnet.prototype.setAvailabilityZone = function(az) {
  Resource.prototype.addProperty.call(this, "AvailabilityZone", az);
};
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
SubnetRouteTableAssociation.prototype.setVpcId = setVpcId;
SubnetRouteTableAssociation.prototype.setRouteTableId = function(routeTableId) {
  if (routeTableId instanceof RouteTable) {
    Resource.prototype.addProperty.call(this, "RouteTableId", {
      "Ref": routeTableId.key
    });
  } else {
    if (/^rtb-/.test(routeTableId) === false) {
      throw new Error("RouteTable IDs should start with 'rtb-' (was " + routeTableId + ")")
    } else {
      Resource.prototype.addProperty.call(this, "RouteTableId", routeTableId);
    }
  }
};
module.exports.SubnetRouteTableAssociation = SubnetRouteTableAssociation;

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
      throw new Error("Internet Gateway IDs should start with 'igw-' (was " + gatewayId + ")")
    } else {
      Resource.prototype.addProperty.call(this, "InternetGatewayId", gatewayId);
    }
  }
};
module.exports.VpcGatewayAttachment = VpcGatewayAttachment;
