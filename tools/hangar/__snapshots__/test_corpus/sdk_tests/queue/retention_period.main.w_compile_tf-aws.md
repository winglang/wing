# [retention_period.main.w](../../../../../../examples/tests/sdk_tests/queue/retention_period.main.w) | compile | tf-aws

<<<<<<< HEAD
## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $q, $retentionPeriod, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $q.push("hello", "world"));
      (await $util_Util.sleep($retentionPeriod));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil(() => {\n    return q.approxSize() == 0;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),0));
      })))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.js.map
```

=======
>>>>>>> 5f6a31d348b198f70983d0eef65719ddc0604ef5
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
      "cloudQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "cloudQueue"
          }
        },
        "message_retention_seconds": 60,
        "name": "cloud-Queue-c86e03d8",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

<<<<<<< HEAD
## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $q: ${context._lift(q)},
            $retentionPeriod: ${context._lift(retentionPeriod)},
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
          $Closure1._registerOnLiftObject(q, host, ["approxSize", "push"]);
          $Closure1._registerOnLiftObject(retentionPeriod, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    let timeout = (std.Duration.fromSeconds(30));
    let retentionPeriod = (std.Duration.fromSeconds(60));
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue", this, "cloud.Queue", { timeout: timeout, retentionPeriod: retentionPeriod });
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "retentionPeriod", new $Closure1(this, "$Closure1"), { timeout: (std.Duration.fromSeconds(120)) });
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "retention_period.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```

=======
>>>>>>> 5f6a31d348b198f70983d0eef65719ddc0604ef5
