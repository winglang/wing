# [shadowing.test.w](../../../../../tests/valid/shadowing.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $bar }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = [];
      $macros.__MutArray_push(false, result, $bar);
      if (true) {
        const bar = "world";
        $macros.__MutArray_push(false, result, bar);
      }
      const foo = "bang";
      $macros.__MutArray_push(false, result, foo);
      return $macros.__MutArray_copy(false, result, );
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
module.exports = function({ $fn }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = (await $fn());
      $helpers.assert($helpers.eq(result.length, 3), "result.length == 3");
      $helpers.assert($helpers.eq($macros.__Array_at(false, result, 0), "hola!"), "result.at(0) == \"hola!\"");
      $helpers.assert($helpers.eq($macros.__Array_at(false, result, 1), "world"), "result.at(1) == \"world\"");
      $helpers.assert($helpers.eq($macros.__Array_at(false, result, 2), "bang"), "result.at(2) == \"bang\"");
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
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $bar: ${$stdlib.core.liftObject(bar)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [bar, []],
          ],
          "$inflight_init": [
            [bar, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $fn: ${$stdlib.core.liftObject(fn)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [fn, ["handle"]],
          ],
          "$inflight_init": [
            [fn, []],
          ],
        });
      }
    }
    const bar = "hola!";
    const foo = "not captured";
    const fn = new $Closure1(this, "$Closure1");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:capture shadow interaction", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "shadowing.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

