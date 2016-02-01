var cn = require('../lib/cumulonimbus');
var AWS = require('aws-sdk');

var template = new cn.Template();
var user = new cn.Iam.User("MyUser");
user.setPath("/dgrant2/");
template.addResource(user);

var managedPolicy = new cn.Iam.ManagedPolicy("MyManagedPolicy");
var doc = new cn.Iam.PolicyDocument();
var stmt = new cn.Iam.PolicyDocument.Statement();
stmt.setAction("*");
stmt.setEffect("Allow");
stmt.setResource("*");
doc.addStatement(stmt);
managedPolicy.setPolicyDocument(doc);
template.addResource(managedPolicy);

var access = new cn.Iam.AccessKey("MyAccessKey");
access.setUserName(user.getRef());
template.addResource(access);

template.validate(function(err) {
  if (err === undefined) {
    var cloudformation = new AWS.CloudFormation({
      region: "us-east-1"
    });
    cloudformation.createStack({
      Capabilities: ["CAPABILITY_IAM"],
      StackName: "cumulonimbus-example",
      TemplateBody: template.toJson()
    }, function(err, data) {
      if (err === null) {
        console.log(data);
      } else {
        console.error(err);
      }
    });
  } else {
    console.log(err);
  }
});
