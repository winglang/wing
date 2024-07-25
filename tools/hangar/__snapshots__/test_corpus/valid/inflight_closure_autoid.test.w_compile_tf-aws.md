# [inflight_closure_autoid.test.w](../../../../../examples/tests/valid/inflight_closure_autoid.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $i }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $inflights }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const i of $helpers.range(0,5,false)) {
        $helpers.assert($helpers.eq((await $macros.__Array_at(false, $inflights, i)()), i), "inflights.at(i)() == i");
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $inflights: ${$stdlib.core.liftObject(inflights)},
          })
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
            require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
              $i: ${$stdlib.core.liftObject(i)},
            })
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
      $macros.__MutArray_push(false, inflights, new $Closure1(this, "$Closure1"));
    }
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight closure auto id", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_closure_autoid.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

