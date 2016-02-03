var cn = require("../cumulonimbus");
var Resource = cn.Resource;

var Fn = {};
module.exports.extend = function(exports) {
  exports.Fn = Fn;
}

function filterParameter(param) {
  if (param instanceof cn.Parameter) {
    return param.getRef();
  } else {
    return param;
  }
}

function filterReferrable(param) {
  if (param instanceof cn.Parameter || param instanceof Resource) {
    return param.getRef();
  } else {
    return param;
  }
}

Fn.Equals = function(valueOne, valueTwo) {
  if (valueOne === undefined) {
    throw new Error("Missing first value");
  }
  if (valueTwo === undefined) {
    throw new Error("Missing second value");
  }

  return {
    "Fn::Equals": [
      filterParameter(valueOne),
      filterParameter(valueTwo)
    ]
  }
}

Fn.And = function(conditions) {
  if (conditions === undefined || conditions.length < 2 || conditions.length > 10) {
    throw new Error("The minimum number of conditions that you can include is 2, and the maximum is 10.");
  }
  return {
    "Fn::And": conditions
  }
}

Fn.If = function(condition_name, value_if_true, value_if_false) {
  if (condition_name === undefined) {
    throw new Error("condition_name is required.");
  }
  if (value_if_true === undefined) {
    throw new Error("value_if_true is required.");
  }
  if (value_if_false === undefined) {
    throw new Error("value_if_false is required.");
  }
  return {
    "Fn::If": [
      condition_name,
      filterReferrable(value_if_true),
      filterReferrable(value_if_false),
    ]
  }
}

Fn.Not = function(condition) {
  if (condition === undefined) {
    throw new Error("condition is required.");
  }
  return {
    "Fn::Not": condition
  }
}

Fn.GetAtt = function(resource, attribute) {
  return {
    "Fn::GetAtt": [
      resource,
      attribute
    ]
  }
}
