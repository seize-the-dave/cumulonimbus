var should = require('should'),
  Policy = require('../lib/Iam').Policy;

describe('Policy', function() {
  describe('New Instance', function() {
    it('should contain a version', function() {
      var policy = new Policy();
      should(policy.toJson()).deepEqual({
        "Version": "2012-10-17"
      });
    });
  });

  describe('Id', function() {
    it('should accept string', function() {
      var policy = new Policy();
      policy.setId("cd3ad3d9-2776-4ef1-a904-4c229d1642ee");
      should(policy.toJson()).deepEqual({
        "Version": "2012-10-17",
        "Id": "cd3ad3d9-2776-4ef1-a904-4c229d1642ee"
      });
    })
  });

  describe('Statement', function() {
    it('should accept empty statements', function() {
      var policy = new Policy();
      policy.addStatement(new Policy.Statement());
      policy.addStatement(new Policy.Statement());
      should(policy.toJson()).deepEqual({
        "Version": "2012-10-17",
        "Statement": [{}, {}]
      });
    });

    describe('Sid', function() {
      it('should accept string', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setSid("1");
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Sid": "1"
          }]
        });
      })
    });

    describe('Effect', function() {
      it('should accept Allow', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setEffect("Allow");
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Effect": "Allow"
          }]
        });
      });

      it('should accept Deny', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setEffect("Deny");
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Effect": "Deny"
          }]
        });
      });

      it('should reject invalid strings', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setEffect("Effect");
        }).should.throw(/Effect/);
      });
    });

    describe('Principal', function() {
      it('should accept wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal("*");
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": "*"
          }]
        });
      });

      it('should reject non-wildcard strings', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal("Invalid");
        }).should.throw(/Principal/);
      });

      it('should reject more than zero keys', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal({
          });
        }).should.throw(/Principal/);
      });

      it('should reject more than one key', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal({
            "AWS": "*",
            "Federated": "Invalid"
          });
        }).should.throw(/Principal/);
      });

      it('should reject invalid key', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal({
            "Example": "Invalid"
          });
        }).should.throw(/Principal/);
      });

      it('should reject AWS account ID', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal({
            "AWS": "12345678901"
          });
        }).should.throw(/Principal/);
      });

      it('should accept AWS account wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": "*"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": "*"
            }
          }]
        });
      });

      it('should accept AWS account IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": "123456789012"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": "123456789012"
            }
          }]
        });
      });

      it('should reject non-string AWS principals (for now)', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal({
            "AWS": [
              "123456789012"
            ]
          });
        }).should.throw(/Principal/);
      });
    });
  });
});
