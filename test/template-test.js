var vows = require('vows'),
    assert = require('assert'),
    template = require('../lib/cumulonimbus').Template;
    
vows.describe('JSON Rendering').addBatch({
    'when instantiating a new template': {
        topic: function() {
            return new Template();
        },
        'we get only the template format version': function(topic) {
            assert.equal(topic, {
                "AWSTemplateFormatVersion": "2010-09-09"
            });
        }
    }
}).export(module);
