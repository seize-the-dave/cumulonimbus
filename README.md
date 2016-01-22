# Cumulonimbus

[![Build Status](https://travis-ci.org/seize-the-dave/cumulonimbus.svg?branch=master)](https://travis-ci.org/seize-the-dave/cumulonimbus) [![Coverage Status](https://coveralls.io/repos/github/seize-the-dave/cumulonimbus/badge.svg?branch=master)](https://coveralls.io/github/seize-the-dave/cumulonimbus?branch=master)

Cumulonimbus is a Node.js library for creating AWS CloudFormation templates programmatically.

## Usage

```js
var cn = require('cumulonimbus');

var template = new cn.Template();
...
console.log(template.toJson());
```
