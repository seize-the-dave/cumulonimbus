var inherits = require("util").inherits;

function Resource(key, type) {
  if (key === undefined) {
    throw new Error("Resources must have a key");
  }
  if (/^[a-zA-Z0-9]+$/.test(key) === false) {
    throw new Error("Keys must use only alphanumeric characters (was " + key + ")");
  }
  this.key = key;
  this.type = type;
  this.properties = Object.create(null);
}
module.exports.Resource = Resource;

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
Resource.prototype.checkProperty = function(property, collect) {
  if (this.properties[property] === undefined) {
    collect(this.toError(property + " is required."));
  }
}
Resource.prototype.checkProperties = function(properties, collect) {
  for (var i = 0; i < properties.length; i++) {
    this.checkProperty(properties[i], collect);
  }
}

function TaggableResource(key, type) {
  Resource.call(this, key, type);
}
inherits(TaggableResource, Resource);
module.exports.TaggableResource = TaggableResource;

TaggableResource.prototype.addTag = function(key, value) {
  if (this.properties.Tags === undefined) {
    this.properties.Tags = {};
  }
  this.properties.Tags[key] = value;
};
