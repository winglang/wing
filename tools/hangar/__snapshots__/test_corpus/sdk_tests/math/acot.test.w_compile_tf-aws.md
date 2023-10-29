# [acot.test.w](../../../../../../examples/tests/sdk_tests/math/acot.test.w) | compile | tf-aws

<<<<<<< HEAD
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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(0) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot(0)),1.5707963267948966)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI / 2) == 0.5669115049410094")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot(($math_Util.PI / 2))),0.5669115049410094)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI) == 0.30816907111598496")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot($math_Util.PI)),0.30816907111598496)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.TAU) == 0.15783119028815887")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot($math_Util.TAU)),0.15783119028815887)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(-0) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot((-0))),(-1.5707963267948966))))};
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
const math = $stdlib.math;
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(0) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot(0)),1.5707963267948966)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI / 2) == 0.5669115049410094")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot((math.Util.PI / 2))),0.5669115049410094)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI) == 0.30816907111598496")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot(math.Util.PI)),0.30816907111598496)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.TAU) == 0.15783119028815887")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot(math.Util.TAU)),0.15783119028815887)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(-0) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot((-0))),(-1.5707963267948966))))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight arc cotgent", new $Closure1(this, "$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "acot.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```

=======
>>>>>>> 5f6a31d348b198f70983d0eef65719ddc0604ef5
