var Resource = require("./Resource").Resource;
var TaggableResource = require("./Resource").TaggableResource;
var inherits = require("util").inherits;

// AWS::SQS::Bucket
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html
function Bucket(key) {
  Resource.call(this, key, "AWS::S3::Bucket");
}
inherits(Bucket, TaggableResource);
module.exports.Bucket = Bucket;

Bucket.prototype.setAccessControl = function(accessControl) {
  this.addProperty("AccessControl", accessControl);
}
Bucket.prototype.setBucketName = function(bucketName) {
  this.addProperty("BucketName", bucketName);
}

// AWS::SQS::BucketPolicy
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html
function BucketPolicy(key) {
  Resource.call(this, key, "AWS::S3::BucketPolicy");
}
inherits(BucketPolicy, Resource);
module.exports.BucketPolicy = BucketPolicy;

BucketPolicy.prototype.setPolicyDocument = function(doc) {
  this.addProperty("PolicyDocument", doc);
}
BucketPolicy.prototype.setBucket = function(bucket) {
  if (bucket instanceof Bucket) {
    this.addProperty("Bucket", bucket.getRef());
  } else {
    this.addProperty("Bucket", bucket);
  }
}
