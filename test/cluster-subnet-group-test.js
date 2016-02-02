var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::Redshift::AccessKey', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Redshift.ClusterSubnetGroup("MyClusterSubnetGroup");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::ClusterSubnetGroup"
      });
    });
  });
});
