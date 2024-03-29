# [reassignment.test.w](../../../../../examples/tests/valid/reassignment.test.w) | compile | tf-aws

## inflight.R-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class R {
    constructor({  }) {
    }
  }
  return R;
}
//# sourceMappingURL=inflight.R-1.js.map
```

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
    class R extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        if (true) {
          this.f = 1;
          this.f1 = 0;
        }
      }
      inc() {
        this.f = (this.f + 1);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.R-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const RClient = ${R._toInflightType()};
            const client = new RClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    let x = 5;
    $helpers.assert($helpers.eq(x, 5), "x == 5");
    x = (x + 1);
    $helpers.assert($helpers.eq(x, 6), "x == 6");
    let z = 1;
    z += 2;
    $helpers.assert($helpers.eq(z, 3), "z == 3");
    z -= 1;
    $helpers.assert($helpers.eq(z, 2), "z == 2");
    const r = new R(this, "R");
    (r.inc());
    $helpers.assert($helpers.eq(r.f, 2), "r.f == 2");
    const f = ((arg) => {
      arg = 0;
      return arg;
    });
    const y = 1;
    $helpers.assert($helpers.eq((f(y)), 0), "f(y) == 0");
    $helpers.assert($helpers.eq(y, 1), "y == 1");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

