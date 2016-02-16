var cn = require("../cumulonimbus");
var Resource = cn.Resource;
var TaggableResource = cn.TaggableResource;
var inherits = require("util").inherits;

var S3 = {};
module.exports.extend = function(exports) {
  exports.S3 = S3;
}

// AWS::SQS::Bucket
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html
function Bucket(key) {
  TaggableResource.call(this, key, "AWS::S3::Bucket");
}
inherits(Bucket, TaggableResource);
S3.Bucket = Bucket;

Bucket.prototype.setAccessControl = function(accessControl) {
  this.addProperty("AccessControl", accessControl);
}
Bucket.prototype.setBucketName = function(bucketName) {
  this.addProperty("BucketName", bucketName);
}
Bucket.prototype.setNotificationConfiguration = function(config) {
  this.addProperty("NotificationConfiguration", config);
}

// AWS::SQS::Bucket Notification Configuration
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
function NotificationConfiguration() {

}
S3.Bucket.NotificationConfiguration = NotificationConfiguration;

NotificationConfiguration.prototype.setTopicConfigurations = function(configs) {
  this.TopicConfigurations = configs;
}

// AWS::SQS::Bucket Topic Configuration
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig-topicconfig.html
function TopicConfiguration() {

}
S3.Bucket.TopicConfiguration = TopicConfiguration;

var eventWhitelist = [
  "s3:ObjectCreated:*",
  "s3:ObjectCreated:Put",
  "s3:ObjectCreated:Post",
  "s3:ObjectCreated:Copy",
  "s3:ObjectCreated:CompleteMultipartUpload",
  "s3:ObjectRemoved:*",
  "s3:ObjectRemoved:Delete",
  "s3:ObjectRemoved:DeleteMarkerCreated",
  "s3:ReducedRedundancyLostObject"
];

TopicConfiguration.prototype.setEvent = function(event) {
  if (eventWhitelist.indexOf(event) === -1) {
    throw Error("Invalid event (was " + event + ")");
  }
  this.Event = event;
};

TopicConfiguration.prototype.setTopic = function(topic) {
  if (topic instanceof cn.Sns.Topic) {
    this.Topic = topic.getRef();
  } else if (/^(arn):([^:]+):sns:([^:]+)?:([0-9]{12})?:(.+)$/.test(topic)) {
    this.Topic = topic;
  } else {
    throw Error("Invalid ARN (was " + topic + ")");
  }
};
TopicConfiguration.prototype.setFilter = function(filter) {
  this.Filter = filter;
};

// AWS::SQS::Bucket Filter
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfiguration-config-filter.html
function Filter() {

}
S3.Bucket.Filter = Filter;
Filter.prototype.setRules = function(rules) {
  this.S3Key = {
    "Rules": rules
  };
}

// AWS::SQS::Bucket Rule
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfiguration-config-filter-s3key-rules.html
function Rule(name, value) {
  if (name !== "prefix" && name !== "suffix") {
    throw Error("Invalid rule name (was " + name + ")");
  }
  this.Name = name;
  this.Value = value;
}
S3.Bucket.Rule = Rule;

// AWS::S3::BucketPolicy
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html
function BucketPolicy(key) {
  Resource.call(this, key, "AWS::S3::BucketPolicy");
}
inherits(BucketPolicy, Resource);
S3.BucketPolicy = BucketPolicy;

BucketPolicy.prototype.setPolicyDocument = function(doc) {
  this.addProperty("PolicyDocument", doc);
}
BucketPolicy.prototype.setBucket = function(bucket) {
  this.addProperty("Bucket", this.simpleFilter(bucket, Bucket));
}
