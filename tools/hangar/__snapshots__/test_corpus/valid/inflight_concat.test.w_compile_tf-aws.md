# [inflight_concat.test.w](../../../../../examples/tests/valid/inflight_concat.test.w) | compile | tf-aws

## inflight.R-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class R {
    constructor({ $this_s1 }) {
      this.$this_s1 = $this_s1;
    }
    async foo() {
      console.log((await this.$this_s1.concat(" world")));
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class R extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.s1 = "hello";
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
              $this_s1: ${$stdlib.core.liftObject(this.s1)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "foo": [
            [this.s1, ["concat"]],
          ],
          "$inflight_init": [
            [this.s1, []],
          ],
        });
      }
    }
    const r = new R(this, "R");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

