# [inflight_class_definitions.test.w](../../../../../examples/tests/valid/inflight_class_definitions.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $F }) {
  class $Closure2 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $B, $a, $d, $fn, $innerD }) {
  class $Closure3 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.A-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
    async goo() {
      return "a2";
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.js.map
```

## inflight.B-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class B {
    async foo() {
      return "b1";
    }
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.js.map
```

## inflight.D-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class D {
    constructor({ $this_inner }) {
      this.$this_inner = $this_inner;
    }
    async callInner() {
      return (await this.$this_inner());
    }
  }
  return D;
}
//# sourceMappingURL=inflight.D-1.js.map
```

## inflight.E-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class E {
    constructor({  }) {
    }
  }
  return E;
}
//# sourceMappingURL=inflight.E-1.js.map
```

## inflight.F-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class F {
    async foo() {
      return "f1";
    }
  }
  return F;
}
//# sourceMappingURL=inflight.F-1.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $PlatformManager = require('./platform_manager.js');
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      foo() {
        return "a1";
      }
      static _toInflightType() {
        return `
          require("./inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "goo", "$inflight_init"];
      }
    }
    class B extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.B-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BClient = ${B._toInflightType(this)};
            const client = new BClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "foo", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
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
              require("./inflight.E-1.js")({
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const EClient = ${E._toInflightType(this)};
                const client = new EClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _supportedOps() {
            return [...super._supportedOps(), "$inflight_init"];
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
              require("./inflight.F-1.js")({
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const FClient = ${F._toInflightType(this)};
                const client = new FClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _supportedOps() {
            return [...super._supportedOps(), "foo", "$inflight_init"];
          }
        }
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("./inflight.$Closure2-1.js")({
                $F: ${$stdlib.core.liftObject(F)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure2Client = ${$Closure2._toInflightType(this)};
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _supportedOps() {
            return [...super._supportedOps(), "handle", "$inflight_init"];
          }
        }
        this.inner = new $Closure2(this, "$Closure2");
      }
      getInner() {
        return this.inner;
      }
      static _toInflightType() {
        return `
          require("./inflight.D-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DClient = ${D._toInflightType(this)};
            const client = new DClient({
              $this_inner: ${$stdlib.core.liftObject(this.inner)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "callInner", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          D._registerOnLiftObject(this.inner, host, []);
        }
        if (ops.includes("callInner")) {
          D._registerOnLiftObject(this.inner, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure3-1.js")({
            $B: ${$stdlib.core.liftObject(B)},
            $a: ${$stdlib.core.liftObject(a)},
            $d: ${$stdlib.core.liftObject(d)},
            $fn: ${$stdlib.core.liftObject(fn)},
            $innerD: ${$stdlib.core.liftObject(innerD)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(a, host, ["goo"]);
          $Closure3._registerOnLiftObject(d, host, ["callInner"]);
          $Closure3._registerOnLiftObject(fn, host, ["handle"]);
          $Closure3._registerOnLiftObject(innerD, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const a = new A(this, "A");
    $helpers.assert($helpers.eq((a.foo()), "a1"), "a.foo() == \"a1\"");
    const fn = new $Closure1(this, "$Closure1");
    const d = new D(this, "D");
    const innerD = (d.getInner());
    $PlatformManager.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure3(this, "$Closure3"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_definitions.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

