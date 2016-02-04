var inherits = require("util").inherits;
var cn = require("./cumulonimbus");

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
Resource.prototype.dependsOn = function(deps) {
  if (deps instanceof Resource) {
    this.deps = deps.key;
  } else {
    this.deps = deps;
  }
}
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
  if (this.deps !== undefined) {
    resource.DependsOn = this.deps;
  }
  if (this.condition !== undefined) {
    resource.Condition = this.condition;
  }
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
};
Resource.prototype.checkProperties = function(properties, collect) {
  for (var i = 0; i < properties.length; i++) {
    this.checkProperty(properties[i], collect);
  }
};
Resource.prototype.getAtt = function(attribute) {
  return cn.Fn.GetAtt(this.key, attribute);
};
Resource.prototype.setCondition = function(condition) {
  if (condition instanceof cn.Condition) {
    this.condition = condition.key;
  } else {
    this.condition = condition;
  }
};
Resource.prototype.simpleFilter = function(ref, type) {
  if (ref instanceof type) {
    return ref.getRef();
  } else {
    return ref;
  }
};

function TaggableResource(key, type) {
  Resource.call(this, key, type);
}
inherits(TaggableResource, Resource);
module.exports.TaggableResource = TaggableResource;

TaggableResource.prototype.addTag = function(key, value) {
  if (this.properties.Tags === undefined) {
    this.properties.Tags = [];
  }
  var filteredValue;
  if (value instanceof cn.Parameter || value instanceof cn.Resource) {
    filteredValue = value.getRef();
  } else {
    filteredValue = value;
  }
  this.properties.Tags.push({
    "Key": key,
    "Value": filteredValue
  });
};
