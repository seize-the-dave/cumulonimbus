var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::SNS::TopicPolicy', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.Sns.TopicPolicy("MyTopicPolicy");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SNS::TopicPolicy"
      });
    });
  });

  describe('PolicyDocument', function() {
    it('should accept policy document', function() {
      var resource = new cn.Sns.TopicPolicy("MyTopicPolicy");
      var doc = new cn.Iam.PolicyDocument();
      var stmt = new cn.Iam.PolicyDocument.Statement();
      stmt.setAction("sns:Publish");
      stmt.setEffect("Allow");
      stmt.setPrincipal("*");
      stmt.setResource("*");
      doc.addStatement(stmt);
      resource.setPolicyDocument(doc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SNS::TopicPolicy",
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

  describe('Topics', function() {
    it('should accept list of topic ARNs', function() {
      var resource = new cn.Sns.TopicPolicy("MyTopicPolicy");
      resource.setTopics([
        "arn:aws:sns:us-east-1:123456789012:mystack-mytopic-NZJ5JSMVGFIE"
      ]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SNS::TopicPolicy",
        "Properties": {
          "Topics": [
            "arn:aws:sns:us-east-1:123456789012:mystack-mytopic-NZJ5JSMVGFIE"
          ]
        }
      });
    });

    it('should accept list of topics', function() {
      var resource = new cn.Sns.TopicPolicy("MyTopicPolicy");
      var topic = new cn.Sns.Topic("MyTopic");
      resource.setTopics([topic]);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::SNS::TopicPolicy",
        "Properties": {
          "Topics": [
            {
              "Ref": "MyTopic"
            }
          ]
        }
      });
    });
  });
});
