# [acsc.test.w](../../../../../../examples/tests/sdk_tests/math/acsc.test.w) | compile | tf-aws

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
      try {
        {console.log(String.raw({ raw: ["", ""] }, (await $math_Util.acsc(0.5))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be equal or greater than |1|.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be equal or greater than |1|.")))};
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(1) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acsc(1)),1.5707963267948966)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(math.PI / 2) == 0.69010709137454")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acsc(($math_Util.PI / 2))),0.69010709137454)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(math.PI) == 0.3239461069319807")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acsc($math_Util.PI)),0.3239461069319807)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(math.TAU) == 0.15983462638513704")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acsc($math_Util.TAU)),0.15983462638513704)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(-1) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acsc((-1))),(-1.5707963267948966))))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
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
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $math_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    try {
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.acsc(0.5))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be equal or greater than |1|.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be equal or greater than |1|.")))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(1) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acsc(1)),1.5707963267948966)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(math.PI / 2) == 0.69010709137454")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acsc((math.Util.PI / 2))),0.69010709137454)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(math.PI) == 0.3239461069319807")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acsc(math.Util.PI)),0.3239461069319807)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(math.TAU) == 0.15983462638513704")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acsc(math.Util.TAU)),0.15983462638513704)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acsc(-1) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acsc((-1))),(-1.5707963267948966))))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight arc cosecant", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "acsc.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

