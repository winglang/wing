# [push.test.w](../../../../../../examples/tests/sdk_tests/queue/push.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $q, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"k1": 1,"k2": "hello","k3": true,"k4": ({"k1": [1, "a", true, ({})]})});
      try {
        (await $q.push(""));
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"Empty messages are not allowed\")")})(e.includes("Empty messages are not allowed"))};
      }
      try {
        (await $q.push("Foo",""));
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"Empty messages are not allowed\")")})(e.includes("Empty messages are not allowed"))};
      }
      (await $q.push("Foo"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return q.approxSize() == 1;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),1));
      }
      )))};
      (await $q.pop());
      (await $q.push("Bar","Baz"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return q.approxSize() == 2;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),2));
      }
      )))};
      (await $q.purge());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(60))));
      (await $q.push("123","\r",String.raw({ raw: ["", ""] }, JSON.stringify(obj))));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return q.approxSize() == 3;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),3));
      }
      )))};
    }
  }
  return $Closure1;
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
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
        "name": "cloud-Queue-c86e03d8"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $q: ${context._lift(q)},
            $std_Duration: ${context._lift($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(q, host, ["approxSize", "pop", "purge", "push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"push",new $Closure1(this,"$Closure1"),({"timeout": (std.Duration.fromSeconds(180))}));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "push.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

