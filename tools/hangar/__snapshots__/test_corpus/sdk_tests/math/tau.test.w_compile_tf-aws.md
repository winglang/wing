# [tau.test.w](../../../../../../examples/tests/sdk_tests/math/tau.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 4 == math.PI / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(($math_Util.TAU / 4),($math_Util.PI / 2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 2 == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(($math_Util.TAU / 2),$math_Util.PI)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU * 3 / 4 == math.PI * 3 / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((($math_Util.TAU * 3) / 4),(($math_Util.PI * 3) / 2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU == math.PI * 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($math_Util.TAU,($math_Util.PI * 2))))};
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
const math = $stdlib.math;
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
            $math_Util: ${context._lift($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
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
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 4 == math.PI / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.TAU / 4),(math.Util.PI / 2))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 2 == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.TAU / 2),math.Util.PI)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU * 3 / 4 == math.PI * 3 / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((math.Util.TAU * 3) / 4),((math.Util.PI * 3) / 2))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU == math.PI * 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(math.Util.TAU,(math.Util.PI * 2))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:TAU",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "tau.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

