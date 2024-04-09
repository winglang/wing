# [inflight_closure_autoid.test.w](../../../../../examples/tests/valid/inflight_closure_autoid.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $i }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return $i;
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $inflights }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const i of $helpers.range(0,5,false)) {
        $helpers.assert($helpers.eq((await ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })($inflights, i)()), i), "inflights.at(i)() == i");
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
            $inflights: ${$stdlib.core.liftObject(inflights)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [inflights, ["at"]],
          ],
          "$inflight_init": [
            [inflights, []],
          ],
        });
      }
    }
    let inflights = [];
    for (const i of $helpers.range(0,5,false)) {
      class $Closure1 extends $stdlib.std.AutoIdResource {
        _id = $stdlib.core.closureId();
        constructor($scope, $id, ) {
          super($scope, $id);
          $helpers.nodeof(this).hidden = true;
        }
        static _toInflightType() {
          return `
            require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
              $i: ${$stdlib.core.liftObject(i)},
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
              [i, []],
            ],
            "$inflight_init": [
              [i, []],
            ],
          });
        }
      }
      inflights.push(new $Closure1(this, "$Closure1"));
    }
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight closure auto id", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_closure_autoid.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

