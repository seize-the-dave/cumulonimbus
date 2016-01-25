# Cumulonimbus

[![Build Status](https://travis-ci.org/seize-the-dave/cumulonimbus.svg?branch=master)](https://travis-ci.org/seize-the-dave/cumulonimbus) [![Coverage Status](https://coveralls.io/repos/github/seize-the-dave/cumulonimbus/badge.svg?branch=master)](https://coveralls.io/github/seize-the-dave/cumulonimbus?branch=master) [![npm version](https://badge.fury.io/js/cumulonimbus.svg)](https://badge.fury.io/js/cumulonimbus)

Cumulonimbus is a Node.js library for creating AWS CloudFormation templates programmatically.

## Resource Support

* AWS::EC2::DHCPOptions
* AWS::EC2::InternetGateway
* AWS::EC2::RouteTable
* AWS::EC2::Subnet
* AWS::EC2::VPC
* AWS::EC2::VPCDHCPOptionsAssociation

## Usage

```js
var cn = require('cumulonimbus');

var template = new cn.Template();
var vpc = new cn.Ec2.Vpc("VPC");
vpc.enableDnsSupport(true);
vpc.enableDnsHostnames(true);
vpc.setCidrBlock("10.0.0.0/16");
vpc.setInstanceTenancy("dedicated");
vpc.addTag("Name", "VPC");

var publicSubnet = new cn.Ec2.Subnet("PublicSubnet");
publicSubnet.setCidrBlock("10.0.0.0/24");
publicSubnet.setVpcId(vpc);

template.addResource(vpc);
template.addResource(publicSubnet);
template.validate(function(err) {
  if (err === undefined) {
    console.log(JSON.stringify(template.toJson(), null, 4));
  }
});
```

Running the JavaScript file about yields the following output:

```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Resources": {
        "VPC": {
            "Type": "AWS::EC2::VPC",
            "Properties": {
                "EnableDnsSupport": true,
                "EnableDnsHostnames": true,
                "CidrBlock": "10.0.0.0/16",
                "InstanceTenancy": "dedicated",
                "Tags": {
                    "Name": "VPC"
                }
            }
        },
        "PublicSubnet": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "CidrBlock": "10.0.0.0/24",
                "VpcId": {
                    "Ref": "VPC"
                }
            }
        }
    }
}
```
