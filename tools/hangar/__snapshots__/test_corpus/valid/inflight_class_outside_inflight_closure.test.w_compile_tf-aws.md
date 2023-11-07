# [inflight_class_outside_inflight_closure.test.w](../../../../../examples/tests/valid/inflight_class_outside_inflight_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $BinaryOperation }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const op = (await (async () => {const o = new $BinaryOperation(10, 20); await o.$inflight_init?.(); return o; })());
      {((cond) => {if (!cond) throw new Error("assertion failed: op.add() == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await op.add()),30)))};
    }
  }
  return $Closure1;
}

```

## inflight.BinaryOperation-1.js
```js
"use strict";
module.exports = function({  }) {
  class BinaryOperation {
    async add() {
      return (this.lhs + this.rhs);
    }
    constructor(lhs, rhs){
      this.$inflight_init = async () => {
        this.lhs = lhs;
        this.rhs = rhs;
      }
    }
  }
  return BinaryOperation;
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
    class BinaryOperation extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.BinaryOperation-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BinaryOperationClient = ${BinaryOperation._toInflightType(this)};
            const client = new BinaryOperationClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["lhs", "rhs", "add", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          BinaryOperation._registerOnLiftObject(this, host, ["lhs", "rhs"]);
        }
        if (ops.includes("add")) {
          BinaryOperation._registerOnLiftObject(this, host, ["lhs", "rhs"]);
        }
        super._registerOnLift(host, ops);
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
            $BinaryOperation: ${context._lift(BinaryOperation)},
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight class outside inflight closure", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_outside_inflight_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

