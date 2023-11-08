# [symbol_shadow.test.w](../../../../../examples/tests/valid/symbol_shadow.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $s }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inner\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s,"inner")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $s }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inResource\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s,"inResource")))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $s }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"top\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s,"top")))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = "insideInflight";
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"insideInflight\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"insideInflight")))};
    }
  }
  return $Closure4;
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
        const s = "inResource";
        {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inResource\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"inResource")))};
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure2-1.js")({
                $s: ${context._lift(s)},
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
              $Closure2._registerOnLiftObject(s, host, []);
            }
            super._registerOnLift(host, ops);
          }
        }
        this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight in resource should capture the right scoped var", new $Closure2(this, "$Closure2"));
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
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $s: ${context._lift(s)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(s, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
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
    const s = "top";
    if (true) {
      const s = "inner";
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inner\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"inner")))};
      class $Closure1 extends $stdlib.std.Resource {
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure1-1.js")({
              $s: ${context._lift(s)},
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
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure1._registerOnLiftObject(s, host, []);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight nested should not capture the shadowed var", new $Closure1(this, "$Closure1"));
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: s == \"top\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"top")))};
    new A(this, "A");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight on top should capture top", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:insideInflight should capture the right scope", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "symbol_shadow.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

