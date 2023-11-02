# [super_call.test.w](../../../../../examples/tests/valid/super_call.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $InflightB }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const b = (await (async () => {const o = new $InflightB(); await o.$inflight_init?.(); return o; })());
      {((cond) => {if (!cond) throw new Error("assertion failed: b.description() == \"InflightB extends InflightA\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await b.description()),"InflightB extends InflightA")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $extended }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: extended.do() == \"value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $extended.do()),"value")))};
    }
  }
  return $Closure2;
}

```

## inflight.A-1.js
```js
"use strict";
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}

```

## inflight.B-1.js
```js
"use strict";
module.exports = function({ $A }) {
  class B extends $A {
    constructor({  }) {
      super({  });
    }
  }
  return B;
}

```

## inflight.BaseClass-1.js
```js
"use strict";
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

```

## inflight.C-1.js
```js
"use strict";
module.exports = function({ $B }) {
  class C extends $B {
    constructor({  }) {
      super({  });
    }
  }
  return C;
}

```

## inflight.D-1.js
```js
"use strict";
module.exports = function({ $C }) {
  class D extends $C {
    constructor({  }) {
      super({  });
    }
  }
  return D;
}

```

## inflight.E-1.js
```js
"use strict";
module.exports = function({ $D }) {
  class E extends $D {
    constructor({  }) {
      super({  });
    }
  }
  return E;
}

```

## inflight.ExtendedClass-1.js
```js
"use strict";
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

```

## inflight.InflightA-1.js
```js
"use strict";
module.exports = function({  }) {
  class InflightA {
    async description() {
      return "InflightA";
    }
  }
  return InflightA;
}

```

## inflight.InflightB-1.js
```js
"use strict";
module.exports = function({ $InflightA }) {
  class InflightB extends $InflightA {
    async description() {
      return String.raw({ raw: ["InflightB extends ", ""] }, (await super.description()));
    }
  }
  return InflightB;
}

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
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.message = "A message from your ancestor";
      }
      static _toInflightType(context) {
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
        return ["$inflight_init"];
      }
    }
    class B extends A {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      description() {
        return "B";
      }
      static _toInflightType(context) {
        return `
          require("./inflight.B-1.js")({
            $A: ${context._lift(A)},
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
        return ["$inflight_init"];
      }
    }
    class C extends B {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      description() {
        return String.raw({ raw: ["C extends ", ""] }, (super.description()));
      }
      static _toInflightType(context) {
        return `
          require("./inflight.C-1.js")({
            $B: ${context._lift(B)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const CClient = ${C._toInflightType(this)};
            const client = new CClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class D extends C {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.D-1.js")({
            $C: ${context._lift(C)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DClient = ${D._toInflightType(this)};
            const client = new DClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class E extends D {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      description() {
        return String.raw({ raw: ["E extends ", ""] }, (super.description()));
      }
      static _toInflightType(context) {
        return `
          require("./inflight.E-1.js")({
            $D: ${context._lift(D)},
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
        return ["$inflight_init"];
      }
    }
    class InflightA extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.InflightA-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const InflightAClient = ${InflightA._toInflightType(this)};
            const client = new InflightAClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["description", "$inflight_init"];
      }
    }
    class InflightB extends InflightA {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.InflightB-1.js")({
            $InflightA: ${context._lift(InflightA)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const InflightBClient = ${InflightB._toInflightType(this)};
            const client = new InflightBClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["description", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $InflightB: ${context._lift(InflightB)},
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
        return ["handle", "$inflight_init"];
      }
    }
    class BaseClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.BaseClass-1.js")({
            $b: ${context._lift(b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BaseClassClient = ${BaseClass._toInflightType(this)};
            const client = new BaseClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["do", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("do")) {
          BaseClass._registerOnLiftObject(b, host, ["get"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class ExtendedClass extends BaseClass {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.ExtendedClass-1.js")({
            $BaseClass: ${context._lift(BaseClass)},
            $b: ${context._lift(b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const ExtendedClassClient = ${ExtendedClass._toInflightType(this)};
            const client = new ExtendedClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["do", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("do")) {
          ExtendedClass._registerOnLiftObject(b, host, ["put"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $extended: ${context._lift(extended)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(extended, host, ["do"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const e = new E(this, "E");
    {((cond) => {if (!cond) throw new Error("assertion failed: e.description() == \"E extends C extends B\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((e.description()),"E extends C extends B")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:super call inflight", new $Closure1(this, "$Closure1"));
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
    const extended = new ExtendedClass(this, "ExtendedClass");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:super call sets binding permissions", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "super_call.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

