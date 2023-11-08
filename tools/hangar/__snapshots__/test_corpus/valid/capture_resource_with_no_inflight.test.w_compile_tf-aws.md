# [capture_resource_with_no_inflight.test.w](../../../../../examples/tests/valid/capture_resource_with_no_inflight.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $a, $a_field }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hey\" == a.field")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hey",$a_field)))};
      (await $a.bar());
    }
  }
  return $Closure1;
}

```

## inflight.A-1.js
```js
"use strict";
module.exports = function({  }) {
  class A {
    constructor({ $this_counter }) {
      this.$this_counter = $this_counter;
    }
    async incCounter() {
      (await this.$this_counter.inc());
    }
    async bar() {
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
  },
  "resource": {
    "aws_dynamodb_table": {
      "A_cloudCounter_1CAB7DAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Counter/Default",
            "uniqueId": "A_cloudCounter_1CAB7DAD"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c88d0b81"
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
        this.field = "hey";
        this.counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this, "cloud.Counter");
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
              $this_counter: ${this._lift(this.counter)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["incCounter", "bar", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          A._registerOnLiftObject(this.counter, host, []);
        }
        if (ops.includes("incCounter")) {
          A._registerOnLiftObject(this.counter, host, ["inc"]);
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
            $a: ${context._lift(a)},
            $a_field: ${context._lift(a.field)},
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
          $Closure1._registerOnLiftObject(a, host, ["bar"]);
          $Closure1._registerOnLiftObject(a.field, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const a = new A(this, "A");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_resource_with_no_inflight.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

