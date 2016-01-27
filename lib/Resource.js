function Resource(key, type) {
  if (key === undefined) {
    throw new Error("Resources must have a key");
  }
  if (/^[a-zA-Z0-9]+$/.test(key) === false) {
    throw new Error("Keys must use only alphanumeric characters (was " + key + ")");
  }
  this.key = key;
  this.type = type;
  this.properties = {};
}
Resource.prototype.constructor = Resource;
Resource.prototype.addProperty = function(key, value) {
  this.properties[key] = value;
};
Resource.prototype.validate = function(callback) {
  // Do nothing
};
Resource.prototype.toError = function(message) {
  return new Error(this.type + "#" + this.key + ": " + message);
};
Resource.prototype.toJson = function() {
  var resource = {
    "Type": this.type
  };
  if (Object.keys(this.properties).length > 0) {
    resource.Properties = {};
  }
  for (var key in this.properties) {
    resource.Properties[key] = this.properties[key];
  }
  return resource;
};
Resource.prototype.getRef = function() {
  return {
    "Ref": this.key
  };
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
