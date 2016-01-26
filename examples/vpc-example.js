var cn = require('../lib/cumulonimbus');

var template = new cn.Template();
var vpc = new cn.Ec2.Vpc("MyVpc");
vpc.setCidrBlock("10.1.0.0/16");
template.addResource(vpc);

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

template.validate(function(err) {
  if (err === undefined) {
    console.log(JSON.stringify(template.toJson(), null, 4));
  } else {
    console.error(err);
  }
});
