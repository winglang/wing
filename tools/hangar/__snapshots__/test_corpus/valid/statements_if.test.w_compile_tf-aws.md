# [statements_if.test.w](../../../../../examples/tests/valid/statements_if.test.w) | compile | tf-aws

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
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
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
        else if ($helpers.neq(b, undefined)) {
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
          else if ($helpers.neq(b, undefined)) {
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
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "statements_if.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

