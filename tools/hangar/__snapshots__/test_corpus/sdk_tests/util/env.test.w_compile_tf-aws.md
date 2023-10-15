# [env.test.w](../../../../../../examples/tests/sdk_tests/util/env.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $NIL, $RANDOM, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"WING_TARGET\").length > 0")})(((await $util_Util.env("WING_TARGET")).length > 0))};
      const noValue = ((await $util_Util.tryEnv($RANDOM)) ?? $NIL);
      {((cond) => {if (!cond) throw new Error("assertion failed: noValue == NIL")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(noValue,$NIL)))};
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
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
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
            $NIL: ${context._lift(NIL)},
            $RANDOM: ${context._lift(RANDOM)},
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
          $Closure1._registerBindObject(NIL, host, []);
          $Closure1._registerBindObject(RANDOM, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const RANDOM = "RANDOM123412121212kjhkjskdjkj";
    const NIL = "<<NIL>>";
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"PATH\").length > 0")})(((util.Util.env("PATH")).length > 0))};
    if ((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.tryEnv("MY_VAR")),undefined))) {
      {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"MY_VAR\") == \"my value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("MY_VAR")),"my value")))};
    }
    let failed = false;
    try {
      (util.Util.env(RANDOM));
    }
    catch {
      failed = true;
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: failed")})(failed)};
    const no_value = ((util.Util.tryEnv(RANDOM)) ?? NIL);
    {((cond) => {if (!cond) throw new Error("assertion failed: no_value == NIL")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(no_value,NIL)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:use util from inflight",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "env.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

