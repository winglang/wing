# [inflight_class_definitions.test.w](../../../../../examples/tests/valid/inflight_class_definitions.test.w) | compile | tf-aws

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
      class C {
        async foo() {
          return "c1";
        }
      }
      const c = (await (async () => {const o = new C(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq((await c.foo()), "c1"), "c.foo() == \"c1\"");
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
module.exports = function({ $F }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return (await (await (async () => {const o = new $F(); await o.$inflight_init?.(); return o; })()).foo());
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $B, $a, $d, $fn, $innerD }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $a.goo()), "a2"), "a.goo() == \"a2\"");
      const b = (await (async () => {const o = new $B(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq((await b.foo()), "b1"), "b.foo() == \"b1\"");
      (await $fn());
      $helpers.assert($helpers.eq((await $d.callInner()), "f1"), "d.callInner() == \"f1\"");
      $helpers.assert($helpers.eq((await $innerD()), "f1"), "innerD() == \"f1\"");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class A {
    constructor($args) {
      const {  } = $args;
    }
    async goo() {
      return "a2";
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
module.exports = function({  }) {
  class B {
    async foo() {
      return "b1";
    }
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.cjs.map
```

## inflight.D-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class D {
    constructor($args) {
      const { $this_inner } = $args;
      this.$this_inner = $this_inner;
    }
    async callInner() {
      return (await this.$this_inner());
    }
  }
  return D;
}
//# sourceMappingURL=inflight.D-1.cjs.map
```

## inflight.E-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class E {
    constructor($args) {
      const {  } = $args;
    }
  }
  return E;
}
//# sourceMappingURL=inflight.E-1.cjs.map
```

## inflight.F-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class F {
    async foo() {
      return "f1";
    }
  }
  return F;
}
//# sourceMappingURL=inflight.F-1.cjs.map
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
      }
      foo() {
        return "a1";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return ({
          "goo": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
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
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return ({
          "foo": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    if ($preflightTypesMap[2]) { throw new Error("B is already in type map"); }
    $preflightTypesMap[2] = B;
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
    class D extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        class E extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
          }
          foo() {
            return "e1";
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.E-1.cjs")({
              })
            `;
          }
          _liftedState() {
            return { ...(super._liftedState?.() ?? {}) };
          }
          get _liftMap() {
            return ({
              "$inflight_init": [
              ],
            });
          }
        }
        const pb = new E(this, "E");
        $helpers.assert($helpers.eq((pb.foo()), "e1"), "pb.foo() == \"e1\"");
        class F extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.F-1.cjs")({
              })
            `;
          }
          _liftedState() {
            return { ...(super._liftedState?.() ?? {}) };
          }
          get _liftMap() {
            return ({
              "foo": [
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        if ($preflightTypesMap[8]) { throw new Error("F is already in type map"); }
        $preflightTypesMap[8] = F;
        class $Closure2 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
                $F: ${$stdlib.core.liftObject(F)},
              })
            `;
          }
          _liftedState() {
            return { ...(super._liftedState?.() ?? {}) };
          }
          get _liftMap() {
            return ({
              "handle": [
                [$helpers.preflightClassSingleton(this, 8), ["foo"]],
                [F, ["foo"]],
              ],
              "$inflight_init": [
                [$helpers.preflightClassSingleton(this, 8), []],
                [F, []],
              ],
            });
          }
        }
        this.inner = new $Closure2(this, "$Closure2");
      }
      getInner() {
        return this.inner;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.D-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_inner: $stdlib.core.liftObject(this.inner),
        };
      }
      get _liftMap() {
        return ({
          "callInner": [
            [this.inner, ["handle"]],
          ],
          "$inflight_init": [
            [this.inner, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
            $B: ${$stdlib.core.liftObject(B)},
            $a: ${$stdlib.core.liftObject(a)},
            $d: ${$stdlib.core.liftObject(d)},
            $fn: ${$stdlib.core.liftObject(fn)},
            $innerD: ${$stdlib.core.liftObject(innerD)},
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return ({
          "handle": [
            [$helpers.preflightClassSingleton(this, 2), ["foo"]],
            [B, []],
            [a, ["goo"]],
            [d, ["callInner"]],
            [fn, ["handle"]],
            [innerD, ["handle"]],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 2), []],
            [B, []],
            [a, []],
            [d, []],
            [fn, []],
            [innerD, []],
          ],
        });
      }
    }
    const a = new A(this, "A");
    $helpers.assert($helpers.eq((a.foo()), "a1"), "a.foo() == \"a1\"");
    const fn = new $Closure1(this, "$Closure1");
    const d = new D(this, "D");
    const innerD = (d.getInner());
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure3(this, "$Closure3"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_definitions.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

