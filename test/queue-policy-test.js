var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::SNS::QueuePolicy', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Sqs.QueuePolicy("MyQueuePolicy");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::QueuePolicy"
      });
    });
  });

  describe('PolicyDocument', function() {
    it('should accept policy document', function() {
      var resource = new cn.Sqs.QueuePolicy("MyQueuePolicy");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setAction("sns:Publish");
      stmt.setEffect("Allow");
      stmt.setPrincipal("*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicyDocument(doc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::QueuePolicy",
        "Properties": {
          "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [{
              "Effect": "Allow",
              "Principal": "*",
              "Action": "sns:Publish",
              "Resource": "*"
            }]
          }
        }
      });
    });
  });

  describe('Queues', function() {
    it('should accept list of queue ARNs', function() {
      var resource = new cn.Sqs.QueuePolicy("MyQueuePolicy");
      resource.setQueues([
        "arn:aws:sqs:us-east-1:123456789012:mystack-myqueue-15PG5C2FC1CW8"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::QueuePolicy",
        "Properties": {
          "Queues": [
            "arn:aws:sqs:us-east-1:123456789012:mystack-myqueue-15PG5C2FC1CW8"
          ]
        }
      });
    });

    it('should accept list of queues', function() {
      var resource = new cn.Sqs.QueuePolicy("MyQueuePolicy");
      var queue = new cn.Sqs.Queue("MyQueue");
      resource.setQueues([queue]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SQS::QueuePolicy",
        "Properties": {
          "Queues": [
            {
              "Ref": "MyQueue"
            }
          ]
        }
      });
    });
  });
});
