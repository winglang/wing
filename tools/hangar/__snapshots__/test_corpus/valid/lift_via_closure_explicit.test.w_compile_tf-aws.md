# [lift_via_closure_explicit.test.w](../../../../../examples/tests/valid/lift_via_closure_explicit.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $fn }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn());
    }
  }
  return $Closure1;
}

```

## inflight.MyClosure-1.js
```js
"use strict";
module.exports = function({  }) {
  class MyClosure {
    constructor({ $this_q }) {
      this.$this_q = $this_q;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await this.$this_q.push("hello"));
    }
  }
  return MyClosure;
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
    "aws_sqs_queue": {
      "MyClosure_cloudQueue_465FD228": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyClosure/cloud.Queue/Default",
            "uniqueId": "MyClosure_cloudQueue_465FD228"
          }
        },
        "message_retention_seconds": 3600,
        "name": "cloud-Queue-c8cccb9b",
        "visibility_timeout_seconds": 30
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
    class MyClosure extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this, "cloud.Queue");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.MyClosure-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClosureClient = ${MyClosure._toInflightType(this)};
            const client = new MyClosureClient({
              $this_q: ${this._lift(this.q)},
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
        if (ops.includes("$inflight_init")) {
          MyClosure._registerOnLiftObject(this.q, host, []);
        }
        if (ops.includes("handle")) {
          MyClosure._registerOnLiftObject(this.q, host, ["push"]);
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
            $fn: ${context._lift(fn)},
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
          $Closure1._registerOnLiftObject(fn, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const fn = new MyClosure(this, "MyClosure");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_via_closure_explicit.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

