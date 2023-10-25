# [median_mode_mean.test.w](../../../../../../examples/tests/sdk_tests/math/median_mode_mean.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
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

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___0__, $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___1__, $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___0__, $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___1__, $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___2__, $math_Util, $modal_arr }) {
module.exports = function({ $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___0__, $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___1__, $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___0__, $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___1__, $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___2__, $math_Util, $modal_arr }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= (await $math_Util.mode($modal_arr)).length) throw new Error("Index out of bounds"); return obj[args[0]]; })((await $math_Util.mode($modal_arr)), [0]),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___0__,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___1__,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___0__,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___1__,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___2__,9)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= (await $math_Util.mode($modal_arr)).length) throw new Error("Index out of bounds"); return obj[args[0]]; })((await $math_Util.mode($modal_arr)), [0]),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___0__,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___1__,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___0__,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___1__,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___2__,9)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
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
            $even_arr: ${context._lift(even_arr)},
            $math_Util: ${context._lift($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
            $odd_arr: ${context._lift(odd_arr)},
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
          $Closure1._registerOnLiftObject(even_arr, host, []);
          $Closure1._registerOnLiftObject(odd_arr, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___0__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [0]))},
            $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___1__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [1]))},
            $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___0__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [0]))},
            $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___1__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [1]))},
            $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___2__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [2]))},
            $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___0__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [0]))},
            $__obj__args_______if__args_0____0____args_0_____bimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______bimodal___1__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [1]))},
            $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___0__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [0]))},
            $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___1__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [1]))},
            $__obj__args_______if__args_0____0____args_0_____multimodal_length__throw_new_Error__Index_out_of_bounds____return_obj_args_0_______multimodal___2__: ${context._lift(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [2]))},
            $math_Util: ${context._lift($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
            $modal_arr: ${context._lift(modal_arr)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [0]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [1]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [0]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [1]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [2]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [0]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [1]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [0]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [1]), host, []);
          $Closure2._registerOnLiftObject(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [2]), host, []);
          $Closure2._registerOnLiftObject(modal_arr, host, ["at"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $math_Util: ${context._lift($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
            $mean_arr: ${context._lift(mean_arr)},
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
        return ["handle", "$inflight_init"];
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight median", new $Closure1(this, "$Closure1"));
    const modal_arr = [1, 2, 2, 3, 4, 7, 9];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= (math.Util.mode(modal_arr)).length) throw new Error("Index out of bounds"); return obj[args[0]]; })((math.Util.mode(modal_arr)), [0]),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= (math.Util.mode(modal_arr)).length) throw new Error("Index out of bounds"); return obj[args[0]]; })((math.Util.mode(modal_arr)), [0]),2)))};
    const bimodal_arr = [1, 2, 2, 3, 4, 7, 7, 9, 7, 2];
    const bimodal = (math.Util.mode(bimodal_arr));
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [0]),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= bimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(bimodal, [1]),7)))};
    const multimodal_arr = [1, 3, 4, 7, 7, 9, 9, 2, 2];
    const multimodal = (math.Util.mode(multimodal_arr));

    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [0]),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [1]),7)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (args[0] < 0 || args[0] >= multimodal.length) throw new Error("Index out of bounds"); return obj[args[0]]; })(multimodal, [2]),9)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight mode",new $Closure2(this,"$Closure2"));
    const mean_arr = [4, 36, 45, 50, 75];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.arithmeticMean(mean_arr) == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.arithmeticMean(mean_arr)),42)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.geometricMean(mean_arr) == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.geometricMean(mean_arr)),30)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.harmonicMean(mean_arr) == 15")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.harmonicMean(mean_arr)),15)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight mean", new $Closure3(this, "$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "median_mode_mean.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

