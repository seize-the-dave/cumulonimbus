var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('Fn::Join', function() {
  it('should reject missing delimiter', function() {
    should((
      function() {
        cn.Fn.Join();
      }
    )).throw(/delimiter is required./);
  });

  it('should reject missing list of values', function() {
    should((
      function() {
        cn.Fn.Join("-");
      }
    )).throw(/listOfValues is required./);
  });

  it('should accept a list of literals', function() {
    should(cn.Fn.Join("-", ["Example"])).deepEqual({
      "Fn::Join": ["-", [
        "Example"
      ]]
    });
  });

  it('should accept a list of references', function() {
    var param = new cn.Parameter("MyParameter", "String")
    var vpc = new cn.Ec2.Vpc("MyVpc");
    should(cn.Fn.Join("-", [param, vpc])).deepEqual({
      "Fn::Join": ["-", [{
        "Ref": "MyParameter"
      }, {
        "Ref": "MyVpc"
      }]]
    });
  });
});
