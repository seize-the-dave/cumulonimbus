var Resource = require("./Resource")

function Vpc(key) {
  Resource.call(this, key, "AWS::EC2::VPC");
}
Vpc.prototype = Object.create(Resource.prototype);
Vpc.prototype.constructor = Vpc;
Vpc.prototype.setCidrBlock = function(cidrBlock) {
  Resource.prototype.addProperty.call(this, "CidrBlock", cidrBlock);
};
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

function Subnet(key) {
  Resource.call(this, key, "AWS::EC2::Subnet");
}
Subnet.prototype = Object.create(Resource.prototype);
Subnet.prototype.constructor = Subnet;
Subnet.prototype.setCidrBlock = function(cidrBlock) {
  Resource.prototype.addProperty.call(this, "CidrBlock", cidrBlock);
};
Subnet.prototype.setVpcId = function(vpcId) {
  if (vpcId instanceof Vpc) {
    Resource.prototype.addProperty.call(this, "VpcId", {
      "Ref": vpcId.key
    });
  } else {
    Resource.prototype.addProperty.call(this, "VpcId", vpcId);
  }
}
module.exports.Subnet = Subnet;
