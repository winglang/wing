# [hypot.test.w](../../../../../../examples/tests/sdk_tests/math/hypot.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.hypot([3, 4])),5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.hypot([5, 12])),13)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $math_Util.hypot([3, 4, 5])), { decimalPlaces: 2 })),7.07)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.hypot([(-5)])),5)))};
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
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
          require("./inflight.$Closure1-1.cjs")({
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.hypot([3, 4])),5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.hypot([5, 12])),13)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round((math.Util.hypot([3, 4, 5])), { decimalPlaces: 2 })),7.07)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.hypot([(-5)])),5)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight hypot", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "hypot.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

