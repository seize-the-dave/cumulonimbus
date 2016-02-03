var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('Fn::And', function() {
  it('should reject missing conditions', function() {
    should((
      function() {
        cn.Fn.And();
      }
    )).throw(/The minimum number of conditions that you can include is 2, and the maximum is 10./);
  });

  it('should reject no conditions', function() {
    should((
      function() {
        cn.Fn.And([]);
      }
    )).throw(/The minimum number of conditions that you can include is 2, and the maximum is 10./);
  });

  it('should reject single condition', function() {
    should((
      function() {
        cn.Fn.And([{"Condition": "MyCondition"}]);
      }
    )).throw(/The minimum number of conditions that you can include is 2, and the maximum is 10./);
  });

  it('should reject more than ten conditions', function() {
    should((
      function() {
        var conditions = [];
        for (var i = 0; i < 11; i++) {
          conditions.push({"Condition": "MyCondition" + i});
        }
        cn.Fn.And(conditions);
      }
    )).throw(/The minimum number of conditions that you can include is 2, and the maximum is 10./);
  });

  it('should accept two conditions', function() {
    should(cn.Fn.And([{"Condition": "Condition0"}, {"Condition": "Condition1"}])).deepEqual({
      "Fn::And": [
        {"Condition": "Condition0"}, {"Condition": "Condition1"}
      ]
    });
  });
});
