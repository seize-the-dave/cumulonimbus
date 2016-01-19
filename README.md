# Cumulonimbus

[![Build Status](https://travis-ci.org/seize-the-dave/cumulonimbus.svg?branch=master)](https://travis-ci.org/seize-the-dave/cumulonimbus)

Cumulonimbus is a Node.js library for creating AWS CloudFormation templates programmatically.

## Usage

```js
var cn = require('cumulonimbus');

var template = new cn.Template();
...
console.log(template.toJson());
```
