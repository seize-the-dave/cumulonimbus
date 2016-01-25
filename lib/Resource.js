function Resource(key, type) {
  if (/^[a-zA-Z0-9]+$/.test(key) == false) {
    throw new Error("Keys must use only alphanumeric characters (was " + key + ")")
  }
  this.key = key;
  this.type = type;
  this.properties = {};
}
Resource.prototype.constructor = Resource;
Resource.prototype.addProperty = function(key, value) {
  this.properties[key] = value;
};
Resource.prototype.toJson = function() {
  var resource = {
    "Type": this.type
  };
  for (var key in this.properties) {
    if (this.properties.hasOwnProperty(key)) {
      if (resource.Properties === undefined) {
        resource.Properties = {};
      }
      resource.Properties[key] = this.properties[key];
    }
  }
  return resource;
};

function TaggableResource(key, type) {
  Resource.call(this, key, type);
}
TaggableResource.prototype = Object.create(Resource.prototype);
TaggableResource.prototype.constructor = TaggableResource;
TaggableResource.prototype.addTag = function(key, value) {
  if (this.properties.Tags === undefined) {
    this.properties.Tags = {};
  }
  this.properties.Tags[key] = value;
};

module.exports.Resource = Resource;
module.exports.TaggableResource = TaggableResource;
