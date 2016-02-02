var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::S3::BucketPolicy', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.S3.BucketPolicy("MyBucketPolicy");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::BucketPolicy"
      });
    });
  });

  describe('PolicyDocument', function() {
    it('should accept policy document', function() {
      var resource = new cn.S3.BucketPolicy("MyBucketPolicy");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setAction("s3:Publish");
      stmt.setEffect("Allow");
      stmt.setPrincipal("*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicyDocument(doc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::BucketPolicy",
        "Properties": {
          "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [{
              "Effect": "Allow",
              "Principal": "*",
              "Action": "s3:Publish",
              "Resource": "*"
            }]
          }
        }
      });
    });
  });

  describe('Bucket', function() {
    it('should accept a string', function() {
      var resource = new cn.S3.BucketPolicy("MyBucketPolicy");
      resource.setBucket("MyBucket");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::BucketPolicy",
        "Properties": {
          "Bucket": "MyBucket"
        }
      });
    });

    it('should accept a bucket', function() {
      var resource = new cn.S3.BucketPolicy("MyBucketPolicy");
      var bucket = new cn.S3.Bucket("MyBucket");
      resource.setBucket(bucket);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::BucketPolicy",
        "Properties": {
          "Bucket": {
            "Ref": "MyBucket"
          }
        }
      });
    });
  });
});
