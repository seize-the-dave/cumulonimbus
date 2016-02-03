var should = require('should');
var cn = require('../lib/cumulonimbus');

describe('Condition', function() {
  describe('Constructor', function() {
    it('should require a key', function() {
      should(function() {
        new cn.Condition();
      }).throw(/key is required./);
    });

    it('should require a function', function() {
      should(function() {
        new cn.Condition("MyCondition");
      }).throw(/func is required./);
    });
  });
});
