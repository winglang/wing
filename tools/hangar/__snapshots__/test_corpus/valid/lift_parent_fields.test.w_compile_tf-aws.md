# [lift_parent_fields.test.w](../../../../../examples/tests/valid/lift_parent_fields.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $c }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $c.do()), "c b a"), "c.do() == \"c b a\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class A {
    constructor($args) {
      const { $this_a } = $args;
      this.$this_a = $this_a;
    }
    async do() {
      return this.$this_a;
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
```

## inflight.B-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $A }) {
  class B extends $A {
    constructor($args) {
      const { $this_b, $this_a } = $args;
      super($args);
      this.$this_b = $this_b;
    }
    async do() {
      return String.raw({ raw: ["", " ", ""] }, this.$this_b, (await super.do()));
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
module.exports = function({ $B }) {
  class C extends $B {
    constructor($args) {
      const { $this_b, $this_c, $this_a } = $args;
      super($args);
      this.$this_b = $this_b;
      this.$this_c = $this_c;
    }
    async dummy() {
      console.log(String.raw({ raw: ["", ""] }, this.$this_b));
    }
    async do() {
      return String.raw({ raw: ["", " ", ""] }, this.$this_c, (await super.do()));
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
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.a = "a";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_a: $stdlib.core.liftObject(this.a),
        };
      }
      get _liftMap() {
        return ({
          "do": [
            [this.a, []],
          ],
          "$inflight_init": [
            [this.a, []],
          ],
        });
      }
    }
    class B extends A {
      constructor($scope, $id, ) {
        super($scope, $id, );
        this.b = "b";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.B-1.cjs")({
            $A: ${$stdlib.core.liftObject(A)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_b: $stdlib.core.liftObject(this.b),
          $this_a: $stdlib.core.liftObject(this.a),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "do": [
            [this.b, []],
          ],
          "$inflight_init": [
            [this.b, []],
          ],
        });
      }
    }
    class C extends B {
      constructor($scope, $id, ) {
        super($scope, $id, );
        this.c = "c";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.C-1.cjs")({
            $B: ${$stdlib.core.liftObject(B)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_b: $stdlib.core.liftObject(this.b),
          $this_c: $stdlib.core.liftObject(this.c),
          $this_a: $stdlib.core.liftObject(this.a),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "dummy": [
            [this.b, []],
          ],
          "do": [
            [this.c, []],
          ],
          "$inflight_init": [
            [this.b, []],
            [this.c, []],
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
            $c: ${$stdlib.core.liftObject(c)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "handle": [
            [c, ["do"]],
          ],
          "$inflight_init": [
            [c, []],
          ],
        });
      }
    }
    const c = new C(this, "C");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_parent_fields.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

