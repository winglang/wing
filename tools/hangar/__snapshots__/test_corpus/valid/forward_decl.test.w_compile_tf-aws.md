# [forward_decl.test.w](../../../../../examples/tests/valid/forward_decl.test.w) | compile | tf-aws

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
    const x = "hi";
    if (true) {
      console.log(String.raw({ raw: ["", ""] }, x));
      const y = new R(this, "R");
    }
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "forward_decl.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

