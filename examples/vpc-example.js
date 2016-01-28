var cn = require('../lib/cumulonimbus');

var template = new cn.Template();

var vpc = new cn.Ec2.Vpc("MyVpc");
vpc.setCidrBlock("10.1.0.0/16");
template.addResource(vpc);

var secondaryVpc = new cn.Ec2.Vpc("SecondaryVpc");
secondaryVpc.setCidrBlock("10.2.0.0/16");
template.addResource(secondaryVpc);

var peeringConnection = new cn.Ec2.VpcPeeringConnection("MyPeeringConnection");
peeringConnection.setVpcId(vpc);
peeringConnection.setPeerVpcId(secondaryVpc);
template.addResource(peeringConnection);

var dhcpOptions = new cn.Ec2.DhcpOptions("MyDhcpOptions");
dhcpOptions.setDomainNameServers(["10.0.0.1"]);
dhcpOptions.setNtpServers(["10.0.0.1"]);
template.addResource(dhcpOptions);

var vpcDhcpOptionsAssoc = new cn.Ec2.VpcDhcpOptionsAssociation("MyVpcDhcpOptionsAssoc");
vpcDhcpOptionsAssoc.setVpcId(vpc);
vpcDhcpOptionsAssoc.setDhcpOptionsId(dhcpOptions);
template.addResource(vpcDhcpOptionsAssoc);

var publicSubnet = new cn.Ec2.Subnet("MySubnet");
publicSubnet.setVpcId(vpc);
publicSubnet.setCidrBlock("10.1.0.0/24");
template.addResource(publicSubnet);

var igw = new cn.Ec2.InternetGateway("MyInternetGateway");
template.addResource(igw);

var igwAttachment = new cn.Ec2.VpcGatewayAttachment("MyGatewayAttachment");
igwAttachment.setVpcId(vpc);
igwAttachment.setInternetGatewayId(igw);
template.addResource(igwAttachment);

var routeTable = new cn.Ec2.RouteTable("MyRouteTable");
routeTable.setVpcId(vpc);
template.addResource(routeTable);

var subnetRouteTableAssoc = new cn.Ec2.SubnetRouteTableAssociation("MySubnetRouteTableAssoc");
subnetRouteTableAssoc.setRouteTableId(routeTable);
subnetRouteTableAssoc.setSubnetId(publicSubnet);
template.addResource(subnetRouteTableAssoc);

var securityGroup = new cn.Ec2.SecurityGroup("MySecurityGroup");
securityGroup.setGroupDescription("MySecurityGroup");
securityGroup.setVpcId(vpc);
template.addResource(securityGroup);

var instance = new cn.Ec2.Instance("MyInstance");
instance.setImageId("ami-12345678");
instance.setSecurityGroupIds(securityGroup);
template.addResource(instance);

var eip = new cn.Ec2.Eip("MyElasticIP");
template.addResource(eip);

var eipAssoc = new cn.Ec2.EipAssociation("MyElasticIPAssociation");
eipAssoc.setAllocationId(eip);
eipAssoc.setInstanceId(instance);
template.addResource(eipAssoc);

template.validate(function(err) {
  if (err === undefined) {
    console.log(template.toJson());
  } else {
    console.error(err);
    process.exit(1);
  }
});
