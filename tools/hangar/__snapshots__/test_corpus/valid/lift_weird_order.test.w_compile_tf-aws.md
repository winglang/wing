# [lift_weird_order.test.w](../../../../../tests/valid/lift_weird_order.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $b, $c }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.do());
      (await $c.do());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.B-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class B {
    async do() {
    }
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.cjs.map
```

## inflight.C-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class C {
    constructor($args) {
      const { $this_b } = $args;
      this.$this_b = $this_b;
    }
    async do() {
      (await this.$this_b.do());
    }
  }
  return C;
}
//# sourceMappingURL=inflight.C-1.cjs.map
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
    class B extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.B-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "do": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class C extends $stdlib.std.Resource {
      constructor($scope, $id, b) {
        super($scope, $id);
        this.b = b;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_b: $stdlib.core.liftObject(this.b),
        };
      }
      get _liftMap() {
        return ({
          "do": [
            [this.b, ["do"]],
          ],
          "$inflight_init": [
            [this.b, []],
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $b: ${$stdlib.core.liftObject(b)},
            $c: ${$stdlib.core.liftObject(c)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [b, ["do"]],
            [c, ["do"]],
          ],
          "$inflight_init": [
            [b, []],
            [c, []],
          ],
        });
      }
    }
    const b = new B(this, "B");
    const c = new C(this, "C", b);
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:something", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_weird_order.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

