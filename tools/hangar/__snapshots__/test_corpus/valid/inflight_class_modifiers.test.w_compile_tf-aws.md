# [inflight_class_modifiers.test.w](../../../../../examples/tests/valid/inflight_class_modifiers.test.w) | compile | tf-aws

## inflight.C-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class C {
    async method() {
    }
    constructor(){
      this.$inflight_init = async () => {
        this.field = 12;
      }
    }
  }
  return C;
}
//# sourceMappingURL=inflight.C-1.js.map
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
    class C extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const CClient = ${C._toInflightType()};
            const client = new CClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "method": [
          ],
          "$inflight_init": [
            [this, ["field"]],
          ],
          "field": [
          ],
        });
      }
    }
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

