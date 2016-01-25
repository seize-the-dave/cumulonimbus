var should = require('should'),
    TaggableResource = require('../lib/Resource').TaggableResource;

describe('TaggableResource', function() {
  describe('when adding a tag', function() {
    it('should be present in the JSON output', function() {
      var resource = new TaggableResource("Example", "AWS::EC2::VPC");
      resource.addTag("Foo", "Value");
      resource.addTag("Bar", "Value");
      should(resource.toJson()).deepEqual({
        "Type": "AWS::EC2::VPC",
        "Properties": {
          "Tags": {
            "Foo": "Value",
            "Bar": "Value"
          }
        }
      });
    });
  });
});
