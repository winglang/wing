# [reassignment.w](../../../../../examples/tests/valid/reassignment.w) | compile | tf-aws

## inflight.R.js
```js
module.exports = function({  }) {
  class R {
    constructor({  }) {
    }
  }
  return R;
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class R extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        if (true) {
          this.f = 1;
          this.f1 = 0;
        }
      }
      inc() {
        this.f = (this.f + 1);
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.R.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const RClient = ${R._toInflightType(this).text};
            const client = new RClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    let x = 5;
    {((cond) => {if (!cond) throw new Error("assertion failed: x == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x,5)))};
    x = (x + 1);
    {((cond) => {if (!cond) throw new Error("assertion failed: x == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x,6)))};
    const r = new R(this,"R");
    (r.inc());
    {((cond) => {if (!cond) throw new Error("assertion failed: r.f == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r.f,2)))};
    const f = ((arg) => {
      arg = 0;
      return arg;
    });
    const y = 1;
    {((cond) => {if (!cond) throw new Error("assertion failed: f(y) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((f(y)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: y == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,1)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "reassignment", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

