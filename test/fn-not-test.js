var should = require('should');
var cn = require('../lib/cumulonimbus');

describe('Fn::Not', function() {
  it('should reject missing condition', function() {
    should(function() {
      cn.Fn.Not()
    }).throw(/condition is required./);
  });

  it('should output correct format', function() {
    var param = new cn.Parameter("MyParameter", "String");
    should(cn.Fn.Not(cn.Fn.Equals(param, "One"))).deepEqual({
      "Fn::Not": {
        "Fn::Equals": [
          {"Ref": "MyParameter"},
          "One"
        ]
      }
    })
  });
});
