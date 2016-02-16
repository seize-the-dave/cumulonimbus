var cn = require("../cumulonimbus");
var Resource = cn.Resource;
var inherits = require("util").inherits;

var Sqs = {};
module.exports.extend = function(exports) {
  exports.Sqs = Sqs;
};

// AWS::SQS::Queue
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html
function Queue(key) {
  Resource.call(this, key, "AWS::SQS::Queue");
}
inherits(Queue, Resource);
Sqs.Queue = Queue;

Queue.prototype.setDelaySeconds = function(seconds) {
  this.addProperty("DelaySeconds", seconds);
};
Queue.prototype.setMaximumMessageSize = function(size) {
  this.addProperty("MaximumMessageSize", size);
}
Queue.prototype.setMessageRetentionPeriod = function(period) {
  this.addProperty("MessageRetentionPeriod", period);
};
Queue.prototype.setQueueName = function(name) {
  this.addProperty("QueueName", name);
};
Queue.prototype.setReceiveMessageWaitTimeSeconds = function(seconds) {
  this.addProperty("ReceiveMessageWaitTimeSeconds", seconds);
};
Queue.prototype.setRedrivePolicy = function(policy) {
  this.addProperty("RedrivePolicy", policy);
};
Queue.prototype.setVisibilityTimeout = function(timeout) {
  this.addProperty("VisibilityTimeout", timeout);
};

function RedrivePolicy() {}
Sqs.Queue.RedrivePolicy = RedrivePolicy;

RedrivePolicy.prototype.setDeadLetterTargetArn = function(arn) {
  this.deadLetterTargetArn = arn;
};
RedrivePolicy.prototype.setMaxReceiveCount = function(count) {
  this.maxReceiveCount = count;
};

// AWS::SQS::QueuePolicy
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-policy.html
function QueuePolicy(key) {
  Resource.call(this, key, "AWS::SQS::QueuePolicy");
}
inherits(QueuePolicy, Resource);
Sqs.QueuePolicy = QueuePolicy;

QueuePolicy.prototype.setPolicyDocument = function(doc) {
  this.addProperty("PolicyDocument", doc);
};
QueuePolicy.prototype.setQueues = function(queues) {
  var copiedQueues = [];
  for (var i = 0; i < queues.length; i++) {
    if (typeof queues[i] === "string") {
      copiedQueues[i] = queues[i];
    } else {
      copiedQueues[i] = queues[i].getRef();
    }
  }
  this.addProperty("Queues", copiedQueues);
};
