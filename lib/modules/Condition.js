var cn = require("../cumulonimbus");

function Condition(key, func) {
  if (key === undefined) {
    throw Error("key is required.");
  }
  if (func === undefined) {
    throw Error("func is required.");
  }
  this.key = key;
  this.func = func;
}
Condition.prototype.toJson = function() {
  return this.func;
}

module.exports.extend = function(exports) {
  exports.Condition = Condition;
}
