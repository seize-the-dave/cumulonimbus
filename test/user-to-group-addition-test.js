var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::IAM::UserToGroupAddition', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Iam.UserToGroupAddition("MyAddition");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::UserToGroupAddition"
      });
    });
  });

  describe('GroupName', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.UserToGroupAddition("MyAddition");
      resource.setGroupName("mystack-mygroup-1DZETITOWEKVO");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::UserToGroupAddition",
        "Properties": {
          "GroupName": "mystack-mygroup-1DZETITOWEKVO"
        }
      });
    });
  });

  describe('Users', function() {
    it('should accept string array', function() {
      var resource = new cn.Iam.UserToGroupAddition("MyAddition");
      resource.setUsers([
        "mystack-myuser-1CCXAFG2H2U4D"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::UserToGroupAddition",
        "Properties": {
          "Users": [
            "mystack-myuser-1CCXAFG2H2U4D"
          ]
        }
      });
    });
  });
});
