# [atan2.test.w](../../../../../../examples/tests/sdk_tests/math/atan2.test.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(90, 15) == 1.4056476493802699")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(90, 15)),1.4056476493802699)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(15, 90) == 0.16514867741462683")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(15, 90)),0.16514867741462683)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-1, -1) == -1 * math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2((-1), (-1))),((((-1) * $math_Util.PI) * 3) / 4))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-0, -1) == -1 * math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2((-0), (-1))),((-1) * $math_Util.PI))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, -1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(0, (-1))),$math_Util.PI)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(1, -1) == math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(1, (-1))),(($math_Util.PI * 3) / 4))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, 0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(0, 0)),0)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.js.map
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(90, 15) == 1.4056476493802699")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(90, 15)),1.4056476493802699)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(15, 90) == 0.16514867741462683")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(15, 90)),0.16514867741462683)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-1, -1) == -1 * math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2((-1), (-1))),((((-1) * math.Util.PI) * 3) / 4))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-0, -1) == -1 * math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2((-0), (-1))),((-1) * math.Util.PI))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, -1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(0, (-1))),math.Util.PI)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(1, -1) == math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(1, (-1))),((math.Util.PI * 3) / 4))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, 0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(0, 0)),0)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight arc tangent 2", new $Closure1(this, "$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "atan2.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```

