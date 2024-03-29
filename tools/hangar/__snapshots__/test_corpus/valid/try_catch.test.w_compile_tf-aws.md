# [try_catch.test.w](../../../../../examples/tests/valid/try_catch.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    let x = "";
    try {
      throw new Error("hello");
      x = "no way I got here";
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "hello"), "e == \"hello\"");
      x = "caught";
    }
    finally {
      $helpers.assert($helpers.eq(x, "caught"), "x == \"caught\"");
      x = "finally";
    }
    $helpers.assert($helpers.eq(x, "finally"), "x == \"finally\"");
    try {
      x = "I got here";
    }
    catch ($error_e) {
      const e = $error_e.message;
      x = "caught";
    }
    finally {
      $helpers.assert($helpers.eq(x, "I got here"), "x == \"I got here\"");
      x = "finally";
    }
    $helpers.assert($helpers.eq(x, "finally"), "x == \"finally\"");
    try {
      try {
        throw new Error("hello");
      }
      finally {
        x = "finally with no catch";
      }
      $helpers.assert($helpers.eq(x, "finally with no catch"), "x == \"finally with no catch\"");
    }
    catch {
    }
    try {
    }
    finally {
      x = "finally with no catch and no exception";
    }
    $helpers.assert($helpers.eq(x, "finally with no catch and no exception"), "x == \"finally with no catch and no exception\"");
    $helpers.assert($helpers.eq(((() => {
      try {
      }
      finally {
        return 1;
      }
    })()), 1), "(():num => { try {} finally {return 1;}})() == 1");
    $helpers.assert($helpers.eq(((() => {
      try {
        throw new Error("");
      }
      catch {
        return 2;
      }
    })()), 2), "(():num => { try {throw \"\";} catch {return 2;}})() == 2");
    $helpers.assert($helpers.eq(((() => {
      try {
        return 3;
      }
      finally {
      }
    })()), 3), "(():num => { try {return 3;} finally {}})() == 3");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

