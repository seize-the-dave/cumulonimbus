var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::Redshift::Cluster', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Redshift.Cluster("MyCluster");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::Redshift::Cluster"
      });
    });
  });
});
