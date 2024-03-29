# [while.test.w](../../../../../examples/tests/valid/while.test.w) | compile | tf-aws

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
    while (false) {
      const x = 1;
    }
    const y = 123;
    while ((y < 0)) {
      const x = 1;
    }
    let z = 0;
    while (true) {
      z = (z + 1);
      if ((z > 2)) {
        break;
      }
    }
    $helpers.assert($helpers.eq(z, 3), "z == 3");
    while (true) {
      break;
    }
    let v = 0;
    let i = 0;
    while ((i < 10)) {
      i = (i + 1);
      if ($helpers.eq((i % 2), 0)) {
        continue;
      }
      v = (v + 1);
    }
    $helpers.assert($helpers.eq(i, 10), "i == 10");
    $helpers.assert($helpers.eq(v, 5), "v == 5");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

