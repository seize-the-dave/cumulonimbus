var Resource = require("./Resource");

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
    Resource.prototype.addProperty.call(this, "VpcId", vpcId);
  }
};

// VPC
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc.html
function Vpc(key) {
  Resource.call(this, key, "AWS::EC2::VPC");
}
Vpc.prototype = Object.create(Resource.prototype);
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
function InternetGateway(key) {
  Resource.call(this, key, "AWS::EC2::InternetGateway");
}
InternetGateway.prototype = Object.create(Resource.prototype);
InternetGateway.prototype.constructor = Subnet;
module.exports.InternetGateway = InternetGateway;

// Subnet
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html
function Subnet(key) {
  Resource.call(this, key, "AWS::EC2::Subnet");
}
Subnet.prototype = Object.create(Resource.prototype);
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
function RouteTable(key) {
  Resource.call(this, key, "AWS::EC2::RouteTable");
}
RouteTable.prototype = Object.create(Resource.prototype);
RouteTable.prototype.constructor = RouteTable;
RouteTable.prototype.setVpcId = setVpcId;
module.exports.RouteTable = RouteTable;

// DHCP Options
// http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-dhcp-options.html
function DhcpOptions(key) {
  Resource.call(this, key, "AWS::EC2::DHCPOptions");
}
DhcpOptions.prototype = Object.create(Resource.prototype);
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
VpcDhcpOptionsAssociation.prototype.constructor = RouteTable;
VpcDhcpOptionsAssociation.prototype.setVpcId = setVpcId;
module.exports.VpcDhcpOptionsAssociation = VpcDhcpOptionsAssociation;
