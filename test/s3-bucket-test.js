var should = require('should'),
  cn = require('../lib/cumulonimbus');

describe('AWS::S3::Bucket', function() {
  describe('New Instance', function() {
    it('we only get the type key', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket"
      });
    });
  });

  describe('AccessControl', function() {
    it('should accept a string', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      resource.setAccessControl("AuthenticatedRead");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket",
        "Properties": {
          "AccessControl": "AuthenticatedRead"
        }
      });
    });
  });

  describe('NotificationConfiguration', function() {
    it('should accept an object', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      var nc = new cn.S3.Bucket.NotificationConfiguration();
      resource.setNotificationConfiguration(nc);
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket",
        "Properties": {
          "NotificationConfiguration": {}
        }
      });
    });

    it('should accept list of topic configurations', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      var topic = new cn.Sns.Topic("MyTopic");
      var nc = new cn.S3.Bucket.NotificationConfiguration();
      var tc = new cn.S3.Bucket.TopicConfiguration();
      tc.setEvent("s3:ObjectCreated:*");
      tc.setTopic(topic);
      var filter = new cn.S3.Bucket.Filter();
      filter.setRules([new cn.S3.Bucket.Rule("suffix", ".jpg")]);
      tc.setFilter(filter);
      nc.setTopicConfigurations([tc])
      resource.setNotificationConfiguration(nc);

      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket",
        "Properties": {
          "NotificationConfiguration": {
            "TopicConfigurations": [{
              "Event": "s3:ObjectCreated:*",
              "Topic": {
                "Ref": "MyTopic"
              },
              "Filter": {
                "S3Key": {
                  "Rules": [{
                    "Name": "suffix",
                    "Value": ".jpg"
                  }]
                }
              }
            }]
          }
        }
      })
    });

    var events = [
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

    describe('TopicConfiguration', function() {
      events.forEach(function(event) {
        it('should accept an ' + event + ' event', function() {
          var tc = new cn.S3.Bucket.TopicConfiguration();
          tc.setEvent(event);

          should(tc).deepEqual({
            "Event": event
          })
        });
      });

      it('should reject a invalid event string', function() {
        var tc = new cn.S3.Bucket.TopicConfiguration();
        should(function() {
          tc.setEvent("sns:ObjectMogrified:*");
        }).throw(/Invalid event/);
      });

      it('should accept a topic object', function() {
        var tc = new cn.S3.Bucket.TopicConfiguration();
        var topic = new cn.Sns.Topic("MyTopic");
        tc.setTopic(topic);

        should(tc).deepEqual({
          "Topic": {
            "Ref": "MyTopic"
          }
        })
      });

      it('should accept an SNS ARN', function() {
        var tc = new cn.S3.Bucket.TopicConfiguration();
        tc.setTopic("arn:aws:sns:us-east-1:123456789012:mystack-mytopic-NZJ5JSMVGFIE");

        should(tc).deepEqual({
          "Topic": "arn:aws:sns:us-east-1:123456789012:mystack-mytopic-NZJ5JSMVGFIE"
        })
      });

      it('should reject an invalid ARN', function() {
        var tc = new cn.S3.Bucket.TopicConfiguration();

        should(function() {
          tc.setTopic("arn:aws:iam::123456789012:policy/teststack-CreateTestDBPolicy-16M23YE3CS700");
        }).throw(/Invalid ARN/)
      });

      it('should accept a suffix filter', function() {
        var tc = new cn.S3.Bucket.TopicConfiguration();
        var filter = new cn.S3.Bucket.Filter();
        filter.setRules([new cn.S3.Bucket.Rule("suffix", ".jpg")]);
        tc.setFilter(filter);

        should(tc).deepEqual({
          "Filter": {
            "S3Key": {
              "Rules": [{
                "Name": "suffix",
                "Value": ".jpg"
              }]
            }
          }
        });
      });

      it('should accept a prefix filter', function() {
        var tc = new cn.S3.Bucket.TopicConfiguration();
        var filter = new cn.S3.Bucket.Filter();
        filter.setRules([new cn.S3.Bucket.Rule("prefix", "/uploads")]);
        tc.setFilter(filter);

        should(tc).deepEqual({
          "Filter": {
            "S3Key": {
              "Rules": [{
                "Name": "prefix",
                "Value": "/uploads"
              }]
            }
          }
        });
      });

      it('should reject an invalid filter', function() {
        var tc = new cn.S3.Bucket.TopicConfiguration();
        var filter = new cn.S3.Bucket.Filter();
        should(function() {
          filter.setRules([new cn.S3.Bucket.Rule("substring", "2016")]);
        }).throw(/Invalid rule name/);
      });
    });
  });

  describe('BucketName', function() {
    it('should accept a string', function() {
      var resource = new cn.S3.Bucket("MyBucket");
      resource.setBucketName("MyBucket");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::S3::Bucket",
        "Properties": {
          "BucketName": "MyBucket"
        }
      });
    });
  });
});
