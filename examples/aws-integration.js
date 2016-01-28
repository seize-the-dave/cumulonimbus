var cn = require('../lib/cumulonimbus');
var AWS = require('aws-sdk');

var template = new cn.Template();
template.addResource(new cn.Ec2.PlacementGroup("MyPlacementGroup"));

template.validate(function(err) {
  if (err === undefined) {
    var cloudformation = new AWS.CloudFormation({
      region: "us-east-1"
    });
    cloudformation.createStack({
      StackName: "cumulonimbus-example",
      TemplateBody: template.toJson()
    }, function(err, data) {
      if (err === null) {
        console.log(data);
      } else {
        console.error(err);
      }
    });
  }
});
