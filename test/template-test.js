var vows = require('vows'),
  assert = require('assert'),
  cn = require('../lib/cumulonimbus');

vows.describe('Templates').addBatch({
  'when instantiating a new template': {
    topic: function() {
      return new cn.Template().toJson();
    },
    'we get only the template format version': function(topic) {
      assert.equal(JSON.stringify(topic), JSON.stringify({
        "AWSTemplateFormatVersion": "2010-09-09"
      }));
    }
  },
  'when validating a template': {
    topic: function() {
      return new cn.Template();
    },
    "an error is returned when we don't add any resources": function(topic) {
      topic.validate(function(err) {
        assert.isNotNull(err);
      });
    }
  }
}).export(module);
