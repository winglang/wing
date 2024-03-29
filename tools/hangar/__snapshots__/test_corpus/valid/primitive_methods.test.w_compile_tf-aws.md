# [primitive_methods.test.w](../../../../../examples/tests/valid/primitive_methods.test.w) | compile | tf-aws

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
    const dur = (std.Duration.fromSeconds(60));
    const dur2 = (std.Duration.fromSeconds(600));
    const f = ((d) => {
    });
    const stringy = String.raw({ raw: ["", ":", ""] }, dur.minutes, dur.seconds);
    console.log(stringy);
    if ((stringy.includes("60") && $helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((stringy.split(":")), 0), "60"))) {
      console.log(String.raw({ raw: ["", "!"] }, stringy.length));
    }
    $helpers.assert($helpers.eq(((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return Number(args) })("123"), 123), "num.fromStr(\"123\") == 123");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

