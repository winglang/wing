# [statements_if.test.w](../../../../../examples/tests/valid/statements_if.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      if (true) {
        const x = 2;
        if ((true && $helpers.eq((x + 2), 4))) {
          if ((true && $helpers.eq((x + 3), 4))) {
            $helpers.assert(false, "false");
          }
          else if ((true && $helpers.eq((x + 3), 6))) {
            $helpers.assert(false, "false");
          }
          else if ((false || $helpers.eq((x + 3), 5))) {
            $helpers.assert(true, "true");
          }
          else {
            $helpers.assert(false, "false");
          }
        }
        else {
          $helpers.assert(false, "false");
        }
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    if (true) {
      const x = 2;
      const f = false;
      if ((true && $helpers.eq((x + 2), 4))) {
        if ((true && $helpers.eq((x + 3), 4))) {
          $helpers.assert(false, "false");
        }
        else if ((true && $helpers.eq((x + 3), 6))) {
          $helpers.assert(false, "false");
        }
        else if ((false || $helpers.eq((x + 3), 5))) {
          $helpers.assert(true, "true");
        }
        else if ((!f)) {
          $helpers.assert((!(!(!f))), "!!!f");
        }
        else {
          $helpers.assert(false, "false");
        }
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
    if (true) {
      const a = undefined;
      const b = "b";
      const c = "c";
      {
        const $if_let_value = a;
        if ($if_let_value != undefined) {
          const d = $if_let_value;
          $helpers.assert(false, "false");
        }
        else if (((b) != null)) {
          $helpers.assert(true, "true");
        }
        else {
          const $elif_let_value1 = c;
          if ($elif_let_value1 != undefined) {
            const e = $elif_let_value1;
            $helpers.assert(false, "false");
          }
          else {
            $helpers.assert(false, "false");
          }
        }
      }
    }
    if (true) {
      const a = undefined;
      const b = undefined;
      const c = "c";
      {
        const $if_let_value = a;
        if ($if_let_value != undefined) {
          const d = $if_let_value;
          $helpers.assert(false, "false");
        }
        else {
          const $elif_let_value0 = c;
          if ($elif_let_value0 != undefined) {
            const e = $elif_let_value0;
            $helpers.assert(true, "true");
          }
          else if (((b) != null)) {
            $helpers.assert(false, "false");
          }
          else {
            $helpers.assert(false, "false");
          }
        }
      }
    }
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

