# [super_call.test.w](../../../../../examples/tests/valid/super_call.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $InflightB, $expect_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const b = (await (async () => {const o = new $InflightB(); await o.$inflight_init?.(); return o; })());
      (await $expect_Util.equal((await b.description()), "InflightB extends InflightA"));
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
module.exports = function({ $expect_Util, $extended }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal((await $extended.do()), "value"));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class A {
    constructor({  }) {
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
    constructor({  }) {
      super({  });
    }
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.cjs.map
```

## inflight.BaseClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $b }) {
  class BaseClass {
    constructor({  }) {
    }
    async do() {
      return (await $b.get("k"));
    }
  }
  return BaseClass;
}
//# sourceMappingURL=inflight.BaseClass-1.cjs.map
```

## inflight.C-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $B }) {
  class C extends $B {
    constructor({  }) {
      super({  });
    }
  }
  return C;
}
//# sourceMappingURL=inflight.C-1.cjs.map
```

## inflight.D-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $C }) {
  class D extends $C {
    constructor({  }) {
      super({  });
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
module.exports = function({ $D }) {
  class E extends $D {
    constructor({  }) {
      super({  });
    }
  }
  return E;
}
//# sourceMappingURL=inflight.E-1.cjs.map
```

## inflight.ExtendedClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $BaseClass, $b }) {
  class ExtendedClass extends $BaseClass {
    constructor({  }) {
      super({  });
    }
    async do() {
      (await $b.put("k", "value"));
      return (await super.do());
    }
  }
  return ExtendedClass;
}
//# sourceMappingURL=inflight.ExtendedClass-1.cjs.map
```

## inflight.InflightA-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class InflightA {
    async description() {
      return "InflightA";
    }
  }
  return InflightA;
}
//# sourceMappingURL=inflight.InflightA-1.cjs.map
```

## inflight.InflightB-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $InflightA }) {
  class InflightB extends $InflightA {
    async description() {
      return String.raw({ raw: ["InflightB extends ", ""] }, (await super.description()));
    }
  }
  return InflightB;
}
//# sourceMappingURL=inflight.InflightB-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      }
    }
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
const expect = $stdlib.expect;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.message = "A message from your ancestor";
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
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class B extends A {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      description() {
        return "B";
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
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class C extends B {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      description() {
        return String.raw({ raw: ["C extends ", ""] }, (super.description()));
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
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class D extends C {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.D-1.cjs")({
            $C: ${$stdlib.core.liftObject(C)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DClient = ${D._toInflightType()};
            const client = new DClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class E extends D {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      description() {
        return String.raw({ raw: ["E extends ", ""] }, (super.description()));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.E-1.cjs")({
            $D: ${$stdlib.core.liftObject(D)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const EClient = ${E._toInflightType()};
            const client = new EClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class InflightA extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.InflightA-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const InflightAClient = ${InflightA._toInflightType()};
            const client = new InflightAClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "description": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class InflightB extends InflightA {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.InflightB-1.cjs")({
            $InflightA: ${$stdlib.core.liftObject(InflightA)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const InflightBClient = ${InflightB._toInflightType()};
            const client = new InflightBClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "description": [
          ],
          "$inflight_init": [
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
            $InflightB: ${$stdlib.core.liftObject(InflightB)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
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
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class BaseClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.BaseClass-1.cjs")({
            $b: ${$stdlib.core.liftObject(b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BaseClassClient = ${BaseClass._toInflightType()};
            const client = new BaseClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "do": [
            [b, ["get"]],
          ],
          "$inflight_init": [
            [b, []],
          ],
        });
      }
    }
    class ExtendedClass extends BaseClass {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ExtendedClass-1.cjs")({
            $BaseClass: ${$stdlib.core.liftObject(BaseClass)},
            $b: ${$stdlib.core.liftObject(b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const ExtendedClassClient = ${ExtendedClass._toInflightType()};
            const client = new ExtendedClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "do": [
            [b, ["put"]],
          ],
          "$inflight_init": [
            [b, []],
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
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $extended: ${$stdlib.core.liftObject(extended)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [extended, ["do"]],
          ],
          "$inflight_init": [
            [extended, []],
          ],
        });
      }
    }
    const e = new E(this, "E");
    (expect.Util.equal((e.description()), "E extends C extends B"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:super call inflight", new $Closure1(this, "$Closure1"));
    const b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const extended = new ExtendedClass(this, "ExtendedClass");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:super call sets binding permissions", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "super_call.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

