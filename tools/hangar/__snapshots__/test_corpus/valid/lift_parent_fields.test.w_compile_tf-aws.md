# [lift_parent_fields.test.w](../../../../../examples/tests/valid/lift_parent_fields.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $c }) {
  class $Closure1 {
    constructor({  }) {
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
module.exports = function({  }) {
  class A {
    constructor({ $this_a }) {
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
module.exports = function({ $A }) {
  class B extends $A {
    constructor({ $this_b, $this_a }) {
      super({ $this_a });
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
module.exports = function({ $B }) {
  class C extends $B {
    constructor({ $this_b, $this_c, $this_a }) {
      super({ $this_b, $this_a });
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
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
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType()};
            const client = new AClient({
              $this_a: ${$stdlib.core.liftObject(this.a)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
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
      _toInflight() {
        return `
          (await (async () => {
            const BClient = ${B._toInflightType()};
            const client = new BClient({
              $this_b: ${$stdlib.core.liftObject(this.b)},
              $this_a: ${$stdlib.core.liftObject(this.a)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
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
      _toInflight() {
        return `
          (await (async () => {
            const CClient = ${C._toInflightType()};
            const client = new CClient({
              $this_b: ${$stdlib.core.liftObject(this.b)},
              $this_c: ${$stdlib.core.liftObject(this.c)},
              $this_a: ${$stdlib.core.liftObject(this.a)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
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
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_parent_fields.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

