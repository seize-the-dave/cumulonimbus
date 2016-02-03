var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('Fn::Equals', function() {
  it('should reject a missing first value', function() {
    should((
      function() {
        cn.Fn.Equals();
      }
    )).throw(/Missing first value/);
  });

  it('should reject a missing second value', function() {
    should((
      function() {
        cn.Fn.Equals("example");
      }
    )).throw(/Missing second value/);
  });

  it('should accept two literals', function() {
    should(cn.Fn.Equals("exampleA", "exampleB")).deepEqual({
      "Fn::Equals": [
        "exampleA",
        "exampleB"
      ]
    });
  });

  it('should accept one literal and one parameter', function() {
    var param = new cn.Parameter("MyParameter", "String");
    should(cn.Fn.Equals("exampleA", param)).deepEqual({
      "Fn::Equals": [
        "exampleA", {
          "Ref": "MyParameter"
        }
      ]
    });
  });
});
