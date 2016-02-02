var Resource = require("./Resource").Resource;
var inherits = require("util").inherits;

var Sns = {};
module.exports.extend = function(exports) {
  exports.Sns = Sns;
}

// AWS::SNS::Topic
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html
function Topic(key) {
  Resource.call(this, key, "AWS::SNS::Topic");
}
inherits(Topic, Resource);
Sns.Topic = Topic;

Topic.prototype.setDisplayName = function(displayName) {
  this.addProperty("DisplayName", displayName);
}
Topic.prototype.setTopicName = function(topicName) {
  this.addProperty("TopicName", topicName);
}

function Subscription() {}
Sns.Topic.Subscription = Subscription;

Subscription.prototype.setEndpoint = function(endpoint) {
  this.Endpoint = endpoint;
}
Subscription.prototype.setProtocol = function(protocol) {
  this.Protocol = protocol;
}

Topic.prototype.setSubscription = function(subscription) {
  this.addProperty("Subscription", subscription);
}

// AWS::SNS::TopicPolicy
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sns-policy.html
function TopicPolicy(key) {
  Resource.call(this, key, "AWS::SNS::TopicPolicy");
}
inherits(TopicPolicy, Resource);
Sns.TopicPolicy = TopicPolicy;

TopicPolicy.prototype.setPolicyDocument = function(doc) {
  this.addProperty("PolicyDocument", doc);
}
TopicPolicy.prototype.setTopics = function(topics) {
  var copiedTopics = [topics.length];
  for (var i = 0; i < topics.length; i++) {
    if (typeof topics[i] === "string") {
      copiedTopics[i] = topics[i];
    } else {
      copiedTopics[i] = topics[i].getRef();
    }
  }
  this.addProperty("Topics", copiedTopics);
}
