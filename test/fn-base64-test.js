var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('Fn::Base64', function() {
  it('should reject missing valueToEncode', function() {
    should((
      function() {
        cn.Fn.Base64();
      }
    )).throw(/valueToEncode is required./);
  });

  it('should accept a string value', function() {
    should(cn.Fn.Base64("Example")).deepEqual({
      "Fn::Base64": "Example"
    });
  });
});
