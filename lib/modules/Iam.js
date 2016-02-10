var cn = require("../cumulonimbus");
var Resource = cn.Resource;
var inherits = require("util").inherits;

var Iam = {};
module.exports.extend = function(exports) {
  exports.Iam = Iam;
}

// http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html
var PolicyDocument = function() {
  this.Version = "2012-10-17";
};
Iam.PolicyDocument = PolicyDocument;
PolicyDocument.prototype.toJson = function() {
  return this;
};
PolicyDocument.prototype.setId = function(id) {
  this.Id = id;
};

// Statement
var Statement = function() {};
Iam.PolicyDocument.Statement = Statement;
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
          /^arn:aws:iam::[0-9]{12}:assumed-role\/[^*]+\/.+$/.test(firstValue) === false) {
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
Statement.prototype.setAction = function(action) {
  this.Action = action;
};
Statement.prototype.setNotAction = function(action) {
  this.NotAction = action;
};
Statement.prototype.guardResource = function(arn) {
  if (arn instanceof Resource) {
    return arn.getRef();
  } else if (arn instanceof Object) {
    return arn;
  } else if (arn === "*") {
    return arn;
  } else if (/^(arn):([^:]+):([^:]+):([^:]+)?:([0-9]{12})?:(.+)$/.test(arn) === false) {
    throw new Error("Invalid ARN (was " + arn + ")");
  } else {
    return arn;
  }
};
Statement.prototype.parseResource = function(resource) {
  if (Array.isArray(resource)) {
    var resources = [];
    for (var i = 0; i < resource.length; i++) {
      resources[i] = this.guardResource(resource[i]);
    }
    return resources;
  } else {
    return this.guardResource(resource);
  }
};
Statement.prototype.setResource = function(resource) {
  this.Resource = this.parseResource(resource);
};
Statement.prototype.setNotResource = function(resource) {
  this.NotResource = this.parseResource(resource);
};
Statement.prototype.setCondition = function(condition) {
  this.Condition = condition;
};

// Back to Policy
PolicyDocument.prototype.addStatement = function(statement) {
  if (this.Statement === undefined) {
    this.Statement = [];
  }
  this.Statement.push(statement);
};

function AbstractPolicy(key, type) {
  Resource.call(this, key, type);
}
inherits(AbstractPolicy, Resource);
AbstractPolicy.prototype.setPolicyDocument = function(doc) {
  this.addProperty("PolicyDocument", doc);
};
AbstractPolicy.prototype.setGroups = function(groups) {
  this.addProperty("Groups", groups);
};
AbstractPolicy.prototype.setUsers = function(users) {
  this.addProperty("Users", users);
};
AbstractPolicy.prototype.setRoles = function(roles) {
  this.addProperty("Roles", roles);
};

// AWS::IAM::Policy
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html
function Policy(key) {
  AbstractPolicy.call(this, key, "AWS::IAM::Policy");
}
inherits(Policy, AbstractPolicy);
Iam.Policy = Policy;
Policy.prototype.setPolicyName = function(name) {
  this.addProperty("PolicyName", name);
};

// AWS::IAM::ManagedPolicy
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html
function ManagedPolicy(key) {
  AbstractPolicy.call(this, key, "AWS::IAM::ManagedPolicy");
}
inherits(ManagedPolicy, AbstractPolicy);
Iam.ManagedPolicy = ManagedPolicy;
ManagedPolicy.prototype.setDescription = function(description) {
  this.addProperty("Description", description);
};
ManagedPolicy.prototype.setPath = function(path) {
  this.addProperty("Path", path);
};
ManagedPolicy.prototype.validate = function(collect) {
  if (this.properties.PolicyDocument === undefined) {
    collect(this.toError("PolicyDocument cannot be empty."));
  }
};


// AWS::IAM::ManagedPolicy
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-managedpolicy.html
function InstanceProfile(key) {
  Resource.call(this, key, "AWS::IAM::InstanceProfile");
}
inherits(InstanceProfile, Resource);
Iam.InstanceProfile = InstanceProfile;
InstanceProfile.prototype.setPath = function(path) {
  this.addProperty("Path", path);
};
InstanceProfile.prototype.setRoles = function(roles) {
  if (Array.isArray(roles)) {
    this.addProperty("Roles", this.arrayFilter(roles, Role));
  } else {
    this.addProperty("Roles", [this.simpleFilter(roles, Role)]);
  }
};

// AWS::IAM::AccessKey
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-accesskey.html
function AccessKey(key) {
  Resource.call(this, key, "AWS::IAM::AccessKey");
}
inherits(AccessKey, Resource);
Iam.AccessKey = AccessKey;
AccessKey.prototype.setSerial = function(serial) {
  this.addProperty("Serial", serial);
};
AccessKey.prototype.setStatus = function(status) {
  this.addProperty("Status", status);
};
AccessKey.prototype.setUserName = function(userName) {
  this.addProperty("UserName", userName);
};

// AWS::IAM::Group
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-group.html
function Group(key) {
  Resource.call(this, key, "AWS::IAM::Group");
}
inherits(Group, Resource);
Iam.Group = Group;
Group.prototype.setManagedPolicyArns = function(arns) {
  this.addProperty("ManagedPolicyArns", arns);
};
Group.prototype.setPath = function(path) {
  this.addProperty("Path", path);
};
Group.prototype.setPolicies = function(policies) {
  this.addProperty("Policies", policies);
};

// AWS::IAM::Role
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html
function Role(key) {
  Resource.call(this, key, "AWS::IAM::Role");
}
inherits(Role, Resource);
Iam.Role = Role;
Role.prototype.setManagedPolicyArns = function(arns) {
  this.addProperty("ManagedPolicyArns", arns);
};
Role.prototype.setPath = function(path) {
  this.addProperty("Path", path);
};
Role.prototype.setPolicies = function(policies) {
  this.addProperty("Policies", policies);
};
Role.prototype.setAssumeRolePolicyDocument = function(policy) {
  this.addProperty("AssumeRolePolicyDocument", policy);
};

// AWS::IAM::User
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-user.html
function User(key) {
  Resource.call(this, key, "AWS::IAM::User");
}
inherits(User, Resource);
Iam.User = User;
User.prototype.setManagedPolicyArns = function(arns) {
  this.addProperty("ManagedPolicyArns", arns);
};
User.prototype.setPath = function(path) {
  if (/^\/([a-z0-9/]+\/)*$/.test(path) === false) {
    throw new Error("Invalid Path (was " + path + ")");
  }
  this.addProperty("Path", path);
};
User.prototype.setPolicies = function(policies) {
  this.addProperty("Policies", policies);
};
User.prototype.setGroups = function(groups) {
  this.addProperty("Groups", groups);
};
function LoginProfile() {}
Iam.User.LoginProfile = LoginProfile;
LoginProfile.prototype.setPassword = function(password) {
  this.Password = password;
};
LoginProfile.prototype.setPasswordResetRequired = function(required) {
  this.PasswordResetRequired = required;
};
User.prototype.setLoginProfile = function(profile) {
  this.addProperty("LoginProfile", profile);
};

// AWS::IAM::User
// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-iam-addusertogroup.html
function UserToGroupAddition(key) {
  Resource.call(this, key, "AWS::IAM::UserToGroupAddition");
}
inherits(UserToGroupAddition, Resource);
Iam.UserToGroupAddition = UserToGroupAddition;
UserToGroupAddition.prototype.setGroupName = function(group) {
  this.addProperty("GroupName", group);
};
UserToGroupAddition.prototype.setUsers = function(users) {
  this.addProperty("Users", users);
};
