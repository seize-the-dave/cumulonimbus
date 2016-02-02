var Resource = require("./Resource").Resource;
var inherits = require("util").inherits;

// AWS::SNS::Topic
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html
function Topic(key) {
  Resource.call(this, key, "AWS::SNS::Topic");
}
inherits(Topic, Resource);
module.exports.Topic = Topic;

Topic.prototype.setDisplayName = function(displayName) {
  this.addProperty("DisplayName", displayName);
}
Topic.prototype.setTopicName = function(topicName) {
  this.addProperty("TopicName", topicName);
}

function Subscription() {}
module.exports.Topic.Subscription = Subscription;

Subscription.prototype.setEndpoint = function(endpoint) {
  this.Endpoint = endpoint;
}
Subscription.prototype.setProtocol = function(protocol) {
  this.Protocol = protocol;
}

Topic.prototype.setSubscription = function(subscription) {
  this.addProperty("Subscription", subscription);
}
