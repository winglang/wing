# [forward_decl.test.w](../../../../../examples/tests/valid/forward_decl.test.w) | compile | tf-aws

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
        this.f = "Hello World!!!";
      }
      method2() {
        (this.method1());
        console.log(String.raw({ raw: ["", ""] }, this.f));
        (this.method2());
      }
      method1() {
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
    const x = "hi";
    if (true) {
      console.log(String.raw({ raw: ["", ""] }, x));
      const y = new R(this, "R");
    }
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

