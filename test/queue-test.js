var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::SQS::Queue', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue"
      });
    });
  });

  describe('DelaySeconds', function() {
    it('should accept integer', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      resource.setDelaySeconds("0");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue",
        "Properties": {
          "DelaySeconds": "0"
        }
      });
    });
  });

  describe('MaximumMessageSize', function() {
    it('should accept integer', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      resource.setMaximumMessageSize("262144");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue",
        "Properties": {
          "MaximumMessageSize": "262144"
        }
      });
    });
  });

  describe('MessageRetentionPeriod', function() {
    it('should accept integer', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      resource.setMessageRetentionPeriod("345600");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue",
        "Properties": {
          "MessageRetentionPeriod": "345600"
        }
      });
    });
  });

  describe('QueueName', function() {
    it('should accept string', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      resource.setQueueName("SampleQueue");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue",
        "Properties": {
          "QueueName": "SampleQueue"
        }
      });
    });
  });

  describe('ReceiveMessageWaitTimeSeconds', function() {
    it('should accept integer', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      resource.setReceiveMessageWaitTimeSeconds("0");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue",
        "Properties": {
          "ReceiveMessageWaitTimeSeconds": "0"
        }
      });
    });
  });

  describe('RedrivePolicy', function() {
    it('should accept redrive policy', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      var policy = new cn.Sqs.Queue.RedrivePolicy();
      policy.setDeadLetterTargetArn("arn:aws:sqs:us-east-1:123456789012:mystack-myqueue-15PG5C2FC1CW8");
      policy.setMaxReceiveCount(5);
      resource.setRedrivePolicy(policy);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue",
        "Properties": {
          "RedrivePolicy": {
            "deadLetterTargetArn": "arn:aws:sqs:us-east-1:123456789012:mystack-myqueue-15PG5C2FC1CW8",
            "maxReceiveCount": 5
          }
        }
      });
    });
  });

  describe('VisibilityTimeout', function() {
    it('should accept integer', function() {
      var resource = new cn.Sqs.Queue("MyQueue");
      resource.setVisibilityTimeout("30");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::Queue",
        "Properties": {
          "VisibilityTimeout": "30"
        }
      });
    });
  });
});
