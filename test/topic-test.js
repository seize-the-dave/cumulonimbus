var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::SNS::Topic', function() {
      describe('New Instance', function() {
        it('we only get the type key', function() {
          var resource = new cn.Sns.Topic("MyTopic");
          should(resource.toJson()).deepEqual({
            "Type": "AWS::SNS::Topic"
          });
        });
      });

      describe('DisplayName', function() {
        it('should accept string', function() {
          var resource = new cn.Sns.Topic("MyTopic");
          resource.setDisplayName("example");
          should(resource.toJson()).deepEqual({
            "Type": "AWS::SNS::Topic",
            "Properties": {
              "DisplayName": "example"
            }
          });
        });
      });

      describe('TopicName', function() {
        it('should accept string', function() {
          var resource = new cn.Sns.Topic("MyTopic");
          resource.setTopicName("example");
          should(resource.toJson()).deepEqual({
            "Type": "AWS::SNS::Topic",
            "Properties": {
              "TopicName": "example"
            }
          });
        });
      });

      describe('Subscription', function() {
        it('should accept list of SNS subscriptions', function() {
          var resource = new cn.Sns.Topic("MyTopic");
          var subscription = new cn.Sns.Topic.Subscription();
          subscription.setProtocol("http");
          subscription.setEndpoint("http://example.org/")
          resource.setSubscription([subscription]);
          should(resource.toJson()).deepEqual({
            "Type": "AWS::SNS::Topic",
            "Properties": {
              "Subscription": [
                {
                  "Protocol": "http",
                  "Endpoint": "http://example.org/"
                }
              ]
            }
          });
        });

        describe('AWS::SNS::Topic::Subscription', function() {
          describe('Endpoint', function() {
            it('should accept string', function() {
              var subscription = new cn.Sns.Topic.Subscription();
              subscription.setEndpoint("http://example.org/");
              should(subscription).deepEqual({
                "Endpoint": "http://example.org/"
              });
            });
          });

          describe('Protocol', function() {
            it('should accept string', function() {
              var subscription = new cn.Sns.Topic.Subscription();
              subscription.setProtocol("http");
              should(subscription).deepEqual({
                "Protocol": "http"
              });
            });
          });
        });
      });
    });
