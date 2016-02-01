// http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html
var Policy = function() {
  this.Version = "2012-10-17";
};
module.exports.Policy = Policy;
Policy.prototype.toJson = function() {
  return this;
};
Policy.prototype.setId = function(id) {
  this.Id = id;
};

// Statement
var Statement = function() {};
module.exports.Policy.Statement = Statement;
Statement.prototype.setSid = function(sid) {
  this.Sid = sid;
};
Statement.prototype.setEffect = function(effect) {
  if (effect !== "Allow" && effect !== "Deny") {
    throw new Error("Effect must be 'Allow' or 'Deny'");
  }
  this.Effect = effect;
};
Statement.prototype.guardPrincipal = function(principal) {
  if (typeof principal === "string") {
    if (principal !== "*") {
      throw new Error("Invalid Principal");
    }
  } else {
    if (Object.keys(principal).length !== 1) {
      throw new Error("Invalid Principal");
    }
    var firstKey = Object.keys(principal)[0];
    if (firstKey === "AWS") {
      var firstValue = principal[firstKey];
      if (typeof firstValue === "string") {
        if (firstValue !== "*" &&
          /^[0-9]{12}$/.test(firstValue) === false &&
          /^arn:aws:iam::[0-9]{12}:root$/.test(firstValue) === false &&
          /^arn:aws:iam::[0-9]{12}:user\/[^*]+$/.test(firstValue) === false &&
          /^arn:aws:iam::[0-9]{12}:role\/[^*]+$/.test(firstValue) === false &&
          /^arn:aws:iam::[0-9]{12}:assumed-role\/[^*]+\/.+$/.test(firstValue) === false ) {
          throw new Error("Invalid Principal");
        }
      } else {
        for (var i = 0; i < firstValue.length; i++) {
          if (/^arn:aws:iam::[0-9]{12}:root$/.test(firstValue[i]) === false &&
            /^arn:aws:iam::[0-9]{12}:user\/[^*]+$/.test(firstValue) === false) {
            throw new Error("Invalid Principal");
          }
        }
      }
    } else if (firstKey !== "Federated" && firstKey !== "Service" && firstKey !== "CanonicalUser") {
      throw new Error("Invalid Principal");
    }
  }
  return principal;
};
Statement.prototype.setPrincipal = function(principal) {
  this.Principal = this.guardPrincipal(principal);
};

Statement.prototype.setNotPrincipal = function(principal) {
  this.NotPrincipal = this.guardPrincipal(principal);
};

// Back to Policy
Policy.prototype.addStatement = function(statement) {
  if (this.Statement === undefined) {
    this.Statement = [];
  }
  this.Statement.push(statement);
};
