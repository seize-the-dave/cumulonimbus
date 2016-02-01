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
    });
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
      });
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

      it('should reject invalid AWS account ID', function() {
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

      it('should accept ARN-format AWS account IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": "arn:aws:iam::123456789012:root"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": "arn:aws:iam::123456789012:root"
            }
          }]
        });
      });

      it('should accept array of ARN-format AWS account IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": [
            "arn:aws:iam::123456789012:root",
            "arn:aws:iam::123456789013:root"
          ]
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": [
                "arn:aws:iam::123456789012:root",
                "arn:aws:iam::123456789013:root"
              ]
            }
          }]
        });
      });

      it('should accept ARN-format AWS user IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": "arn:aws:iam::123456789012:user/example"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": "arn:aws:iam::123456789012:user/example"
            }
          }]
        });
      });

      it('should reject ARN-format AWS user wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal({
            "AWS": "arn:aws:iam::123456789012:user/*"
          });
        }).should.throw(/Principal/);
      });

      it('should accept array of ARN-format AWS user IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": [
            "arn:aws:iam::123456789012:user/foo",
            "arn:aws:iam::123456789012:user/bar",
          ]
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": [
                "arn:aws:iam::123456789012:user/foo",
                "arn:aws:iam::123456789012:user/bar"
              ]
            }
          }]
        });
      });

      it('should reject array of ARN-format AWS user wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setPrincipal({
            "AWS": [
              "arn:aws:iam::123456789012:user/*",
              "arn:aws:iam::123456789012:user/bar"
            ]
          });
        }).should.throw(/Principal/);
      });

      it('should accept web-identity federation', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "Federated": "accounts.google.com"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "Federated": "accounts.google.com"
            }
          }]
        });
      });

      it('should accept ARN-format AWS role', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": "arn:aws:iam::123456789012:role/example"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": "arn:aws:iam::123456789012:role/example"
            }
          }]
        });
      });

      it('should accept ARN-format AWS assumed-role user', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "AWS": "arn:aws:iam::123456789012:assumed-role/example/example"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "AWS": "arn:aws:iam::123456789012:assumed-role/example/example"
            }
          }]
        });
      });

      it('should accept AWS service', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "Service": "ec2.amazonaws.com"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "Service": "ec2.amazonaws.com"
            }
          }]
        });
      });

      it('should accept canonical user', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setPrincipal({
          "CanonicalUser": "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "Principal": {
              "CanonicalUser": "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be"
            }
          }]
        });
      });
    });

    describe('NotPrincipal', function() {
      it('should accept wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal("*");
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": "*"
          }]
        });
      });

      it('should reject non-wildcard strings', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal("Invalid");
        }).should.throw(/Principal/);
      });

      it('should reject more than zero keys', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal({
          });
        }).should.throw(/Principal/);
      });

      it('should reject more than one key', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal({
            "AWS": "*",
            "Federated": "Invalid"
          });
        }).should.throw(/Principal/);
      });

      it('should reject invalid key', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal({
            "Example": "Invalid"
          });
        }).should.throw(/Principal/);
      });

      it('should reject invalid AWS account ID', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal({
            "AWS": "12345678901"
          });
        }).should.throw(/Principal/);
      });

      it('should accept AWS account wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": "*"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": "*"
            }
          }]
        });
      });

      it('should accept AWS account IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": "123456789012"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": "123456789012"
            }
          }]
        });
      });

      it('should accept ARN-format AWS account IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": "arn:aws:iam::123456789012:root"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": "arn:aws:iam::123456789012:root"
            }
          }]
        });
      });

      it('should accept array of ARN-format AWS account IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": [
            "arn:aws:iam::123456789012:root",
            "arn:aws:iam::123456789013:root"
          ]
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": [
                "arn:aws:iam::123456789012:root",
                "arn:aws:iam::123456789013:root"
              ]
            }
          }]
        });
      });

      it('should accept ARN-format AWS user IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": "arn:aws:iam::123456789012:user/example"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": "arn:aws:iam::123456789012:user/example"
            }
          }]
        });
      });

      it('should reject ARN-format AWS user wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal({
            "AWS": "arn:aws:iam::123456789012:user/*"
          });
        }).should.throw(/Principal/);
      });

      it('should accept array of ARN-format AWS user IDs', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": [
            "arn:aws:iam::123456789012:user/foo",
            "arn:aws:iam::123456789012:user/bar",
          ]
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": [
                "arn:aws:iam::123456789012:user/foo",
                "arn:aws:iam::123456789012:user/bar"
              ]
            }
          }]
        });
      });

      it('should reject array of ARN-format AWS user wildcard', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal({
            "AWS": [
              "arn:aws:iam::123456789012:user/*",
              "arn:aws:iam::123456789012:user/bar"
            ]
          });
        }).should.throw(/Principal/);
      });

      it('should accept web-identity federation', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "Federated": "accounts.google.com"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "Federated": "accounts.google.com"
            }
          }]
        });
      });

      it('should accept ARN-format AWS role', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": "arn:aws:iam::123456789012:role/example"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": "arn:aws:iam::123456789012:role/example"
            }
          }]
        });
      });

      it('should accept ARN-format AWS assumed-role user', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "AWS": "arn:aws:iam::123456789012:assumed-role/example/example"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "AWS": "arn:aws:iam::123456789012:assumed-role/example/example"
            }
          }]
        });
      });

      it('should accept AWS service', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "Service": "ec2.amazonaws.com"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "Service": "ec2.amazonaws.com"
            }
          }]
        });
      });

      it('should accept canonical user', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        statement.setNotPrincipal({
          "CanonicalUser": "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be"
        });
        policy.addStatement(statement);
        should(policy.toJson()).deepEqual({
          "Version": "2012-10-17",
          "Statement": [{
            "NotPrincipal": {
              "CanonicalUser": "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be"
            }
          }]
        });
      });

      it('should reject non-string AWS principals (for now)', function() {
        var policy = new Policy();
        var statement = new Policy.Statement();
        (function() {
          statement.setNotPrincipal({
            "AWS": [
              "123456789012"
            ]
          });
        }).should.throw(/Principal/);
      });
    });
  });
});
