# [angular_conversion.test.w](../../../../../../examples/tests/sdk_tests/math/angular_conversion.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(360) == math.TAU")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.degreesToRadians(360)),$math_Util.TAU)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(180) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.degreesToRadians(180)),$math_Util.PI)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(90) == math.PI / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.degreesToRadians(90)),($math_Util.PI / 2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(60) == math.PI / 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.degreesToRadians(60)),($math_Util.PI / 3))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(45) == math.PI / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.degreesToRadians(45)),($math_Util.PI / 4))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(30) == math.PI / 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.degreesToRadians(30)),($math_Util.PI / 6))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.TAU) == 360")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.radiansToDegrees($math_Util.TAU)),360)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI) == 180")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.radiansToDegrees($math_Util.PI)),180)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 2) == 90")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.radiansToDegrees(($math_Util.PI / 2))),90)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 3)) == 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $math_Util.radiansToDegrees(($math_Util.PI / 3))))),60)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 4) == 45")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.radiansToDegrees(($math_Util.PI / 4))),45)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 6)) == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $math_Util.radiansToDegrees(($math_Util.PI / 6))))),30)))};
    }
    async $inflight_init() {
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(360) == math.TAU")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.degreesToRadians(360)),math.Util.TAU)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(180) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.degreesToRadians(180)),math.Util.PI)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(90) == math.PI / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.degreesToRadians(90)),(math.Util.PI / 2))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(60) == math.PI / 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.degreesToRadians(60)),(math.Util.PI / 3))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(45) == math.PI / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.degreesToRadians(45)),(math.Util.PI / 4))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(30) == math.PI / 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.degreesToRadians(30)),(math.Util.PI / 6))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.TAU) == 360")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.radiansToDegrees(math.Util.TAU)),360)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI) == 180")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.radiansToDegrees(math.Util.PI)),180)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 2) == 90")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.radiansToDegrees((math.Util.PI / 2))),90)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 3)) == 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round((math.Util.radiansToDegrees((math.Util.PI / 3))))),60)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 4) == 45")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.radiansToDegrees((math.Util.PI / 4))),45)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 6)) == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round((math.Util.radiansToDegrees((math.Util.PI / 6))))),30)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight angular conversions",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "angular_conversion.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

