var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::CodeDeploy::Application', function() {
  describe('Constructor', function() {
    it('should output correct format', function() {
      var resource = new cn.CodeDeploy.Application("MyApplication");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::Application"
      });
    });
  });

  describe('ApplicationName', function() {
    it('should accept a string', function() {
      var resource = new cn.CodeDeploy.Application("MyApplication");
      resource.setApplicationName("Example");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::CodeDeploy::Application",
        "Properties": {
          "ApplicationName": "Example"
        }
      });
    });
  });
});
