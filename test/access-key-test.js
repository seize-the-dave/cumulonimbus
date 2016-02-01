var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::IAM::AccessKey', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Iam.AccessKey("AccessKey");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::AccessKey"
      });
    });
  });

  describe('Serial', function() {
    it('should accept integer', function() {
      var resource = new cn.Iam.AccessKey("AccessKey");
      resource.setSerial("1");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::AccessKey",
        "Properties": {
          "Serial": "1"
        }
      });
    });
  });

  describe('Status', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.AccessKey("AccessKey");
      resource.setStatus("Active");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::AccessKey",
        "Properties": {
          "Status": "Active"
        }
      });
    });
  });

  describe('UserName', function() {
    it('should accept string', function() {
      var resource = new cn.Iam.AccessKey("AccessKey");
      resource.setUserName("mystack-myuser-1CCXAFG2H2U4D");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::IAM::AccessKey",
        "Properties": {
          "UserName": "mystack-myuser-1CCXAFG2H2U4D"
        }
      });
    });
  });
});
