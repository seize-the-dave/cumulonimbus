var should = require('should');
var cn = require('../lib/cumulonimbus');

describe('Fn::If', function() {
  it('should reject missing condition_name', function() {
    should(function() {
      cn.Fn.If()
    }).throw(/condition_name is required./);
  });

  it('should reject missing value_if_true', function() {
    should(function() {
      cn.Fn.If("MyCondition")
    }).throw(/value_if_true is required./);
  });

  it('should reject missing value_if_false', function() {
    var vpc = new cn.Ec2.Vpc("MyVpc");
    should(function() {
      cn.Fn.If("MyCondition", vpc)
    }).throw(/value_if_false is required./);
  });

  it('should output correct format', function() {
    var param = new cn.Parameter("MyParameter", "String");
    var vpc = new cn.Ec2.Vpc("MyVpc");
    should(cn.Fn.If("MyCondition", param, vpc)).deepEqual({
      "Fn::If": [
        "MyCondition", {
          "Ref": "MyParameter"
        }, {
          "Ref": "MyVpc"
        }
      ]
    });
  });
});
