# [capture_mutables.test.w](../../../../../tests/valid/capture_mutables.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $a, $aCloned, $m, $s }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($a.length, 1), "a.length == 1");
      $helpers.assert($helpers.eq($s.size, 1), "s.size == 1");
      $helpers.assert($helpers.eq($macros.__Map_size(false, $m, ), 1), "m.size() == 1");
      $helpers.assert($helpers.eq($aCloned.length, 1), "aCloned.length == 1");
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
module.exports = function({ $handler }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $handler());
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
const $types = require("./types.cjs");
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
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
            $a: ${$stdlib.core.liftObject(a)},
            $aCloned: ${$stdlib.core.liftObject(aCloned)},
            $m: ${$stdlib.core.liftObject(m)},
            $s: ${$stdlib.core.liftObject(s)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [a, ["length"]],
            [aCloned, ["length"]],
            [m, ["size"]],
            [s, ["size"]],
          ],
          "$inflight_init": [
            [a, []],
            [aCloned, []],
            [m, []],
            [s, []],
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
            $handler: ${$stdlib.core.liftObject(handler)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [handler, ["handle"]],
          ],
          "$inflight_init": [
            [handler, []],
          ],
        });
      }
    }
    const a = ["hello"];
    const s = new Set([12]);
    const m = ({["hello"]: true});
    const aCloned = $macros.__Array_copyMut(false, ["hello"], );
    const handler = new $Closure1(this, "$Closure1");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:main", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_mutables.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

