var should = require('should'),
    cn = require('../lib/cumulonimbus');

describe('AWS::EC2::InternetGateway', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Ec2.InternetGateway("IGW");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::InternetGateway"
      });
    });
  });

  describe('validation', function() {
    it('should never return an error', function() {
      var resource = new cn.Ec2.InternetGateway("IGW");

      var actual;
      resource.validate(function(err) {
        actual = err;
      });
      should.not.exist(actual);
    });
  });
});
