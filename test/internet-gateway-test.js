var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::InternetGateway', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.InternetGateway("IGW");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::InternetGateway"
      });
    });
  });

  describe('Tags', function() {
    it('should be present in the JSON output', function() {
      var resource = new cn.Ec2.InternetGateway("IGW");
      resource.addTag("Name", "IGW");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::InternetGateway",
        "Properties": {
          "Tags": {
            "Name": "IGW"
          }
        }
      });
    });
  });
});
