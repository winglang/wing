# [function_returns_function.test.w](../../../../../examples/tests/valid/function_returns_function.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const iFn = (async (s) => {
        return (async () => {
          return $helpers.eq(s, "wing");
        });
      });
      const wingInflightFn = (await iFn("wing"));
      const dingInflightFn = (await iFn("ding"));
      $helpers.assert((await wingInflightFn()), "wingInflightFn()");
      $helpers.assert((!(await dingInflightFn())), "!dingInflightFn()");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
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
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
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
    const fn = ((s) => {
      return (() => {
        return $helpers.eq(s, "wing");
      });
    });
    const wingFn = (fn("wing"));
    const dingFn = (fn("ding"));
    $helpers.assert((wingFn()), "wingFn()");
    $helpers.assert((!(dingFn())), "!dingFn()");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight functions can return other inflight functions", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "function_returns_function.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

