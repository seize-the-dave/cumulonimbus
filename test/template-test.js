var vows = require('vows'),
    assert = require('assert'),
    cn = require('../lib/cumulonimbus');
    
vows.describe('JSON Rendering').addBatch({
    'when instantiating a new template': {
        topic: function() {
            return new cn.Template().toJson();
        },
        'we get only the template format version': function(topic) {
            assert.equal(JSON.stringify(topic), JSON.stringify({"AWSTemplateFormatVersion": "2010-09-09"}));
        }
    }
}).export(module);
