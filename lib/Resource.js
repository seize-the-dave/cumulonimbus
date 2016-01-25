function Resource(key, type) {
  this.key = key;
  this.type = type;
  this.properties = {};
}
Resource.prototype.constructor = Resource;
Resource.prototype.addProperty = function(key, value) {
  this.properties[key] = value;
};
Resource.prototype.addTag = function(key, value) {
  if (this.properties.Tags === undefined) {
    this.properties.Tags = {};
  }
  this.properties.Tags[key] = value;
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

module.exports = Resource;
