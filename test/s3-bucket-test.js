var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::S3::Bucket', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket"
      });
    });
  });

  describe('AccessControl', function() {
    it('should accept a string', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      resource.setAccessControl("AuthenticatedRead");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket",
        "Properties": {
          "AccessControl": "AuthenticatedRead"
        }
      });
    });
  });

  describe('BucketName', function() {
    it('should accept a string', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      resource.setBucketName("MyBucket");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket",
        "Properties": {
          "BucketName": "MyBucket"
        }
      });
    });
  });
});
