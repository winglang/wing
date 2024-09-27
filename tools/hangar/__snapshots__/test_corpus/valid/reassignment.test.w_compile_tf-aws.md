# [reassignment.test.w](../../../../../tests/valid/reassignment.test.w) | compile | tf-aws

## inflight.R-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class R {
  }
  return R;
}
//# sourceMappingURL=inflight.R-1.cjs.map
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
const $types = require("./types.cjs");
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
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
          require("${$helpers.normalPath(__dirname)}/inflight.R-1.cjs")({
          })
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
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "reassignment.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

