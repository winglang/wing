# [prime.test.w](../../../../../../examples/tests/sdk_tests/math/prime.test.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(1) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(1)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(2) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(2)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(3) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(3)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(4) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(4)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(10) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(10)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(11) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(11)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(12) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(12)),false)))};
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(1) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(1)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(2) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(2)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(3) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(3)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(4) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(4)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(10) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(10)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(11) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(11)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(12) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(12)),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight prime numbers",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "prime.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

