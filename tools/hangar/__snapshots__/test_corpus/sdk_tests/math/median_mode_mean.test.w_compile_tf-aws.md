# [median_mode_mean.test.w](../../../../../../examples/tests/sdk_tests/math/median_mode_mean.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $even_arr, $math_Util, $odd_arr }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.median(odd_arr) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.median($odd_arr)),6)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.median(even_arr) == 4.5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.median($even_arr)),4.5)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______bimodal__0_, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______bimodal__1_, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__0_, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__1_, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__2_, $math_Util, $modal_arr }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((await $math_Util.mode($modal_arr)), 0),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______bimodal__0_,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______bimodal__1_,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__0_,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__1_,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__2_,9)))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $math_Util, $mean_arr }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.arithmeticMean(mean_arr) == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.arithmeticMean($mean_arr)),42)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.geometricMean(mean_arr) == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.geometricMean($mean_arr)),30)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.harmonicMean(mean_arr) == 15")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.harmonicMean($mean_arr)),15)))};
    }
  }
  return $Closure3;
}
//# sourceMappingURL=./inflight.$Closure3-1.cjs.map
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
            $even_arr: ${$stdlib.core.liftObject(even_arr)},
            $math_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
            $odd_arr: ${$stdlib.core.liftObject(odd_arr)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(even_arr, host, []);
          $Closure1._registerOnLiftObject(odd_arr, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure2-1.cjs")({
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______bimodal__0_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(bimodal, 0))},
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______bimodal__1_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(bimodal, 1))},
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__0_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 0))},
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__1_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 1))},
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______multimodal__2_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 2))},
            $math_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
            $modal_arr: ${$stdlib.core.liftObject(modal_arr)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(bimodal, 0), host, []);
          $Closure2._registerOnLiftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(bimodal, 1), host, []);
          $Closure2._registerOnLiftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 0), host, []);
          $Closure2._registerOnLiftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 1), host, []);
          $Closure2._registerOnLiftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 2), host, []);
          $Closure2._registerOnLiftObject(modal_arr, host, ["at"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure3-1.cjs")({
            $math_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
            $mean_arr: ${$stdlib.core.liftObject(mean_arr)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(mean_arr, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const odd_arr = [1, 3, 3, 6, 7, 8, 9];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.median(odd_arr) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.median(odd_arr)),6)))};
    const even_arr = [1, 2, 3, 4, 5, 6, 8, 9];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.median(even_arr) == 4.5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.median(even_arr)),4.5)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight median", new $Closure1(this, "$Closure1"));
    const modal_arr = [1, 2, 2, 3, 4, 7, 9];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((math.Util.mode(modal_arr)), 0),2)))};
    const bimodal_arr = [1, 2, 2, 3, 4, 7, 7, 9, 7, 2];
    const bimodal = (math.Util.mode(bimodal_arr));
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(bimodal, 0),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(bimodal, 1),7)))};
    const multimodal_arr = [1, 3, 4, 7, 7, 9, 9, 2, 2];
    const multimodal = (math.Util.mode(multimodal_arr));
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 0),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 1),7)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(multimodal, 2),9)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight mode", new $Closure2(this, "$Closure2"));
    const mean_arr = [4, 36, 45, 50, 75];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.arithmeticMean(mean_arr) == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.arithmeticMean(mean_arr)),42)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.geometricMean(mean_arr) == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.geometricMean(mean_arr)),30)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.harmonicMean(mean_arr) == 15")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.harmonicMean(mean_arr)),15)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight mean", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "median_mode_mean.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

