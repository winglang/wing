# [this.test.w](../../../../../examples/tests/valid/this.test.w) | compile | tf-aws

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
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const path = this.node.path;
    for (const c of this.node.children) {
      console.log(c.node.path);
    }
    (expect.Util.notNil(this.node));
    (expect.Util.equal(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((this.node.path.split("/")), 0), "root"));
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

