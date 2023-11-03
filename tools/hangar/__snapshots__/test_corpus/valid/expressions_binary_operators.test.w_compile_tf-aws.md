# [expressions_binary_operators.test.w](../../../../../examples/tests/valid/expressions_binary_operators.test.w) | compile | tf-aws

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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const x = (-1);
    const y = (2 * x);
    const z = ((x + y) - 1);
    const xyz = (((y * y) / (x * x)) * z);
    const xf = 1;
    const yf = ((-20.22) * xf);
    const zf = ((xf + yf) - (-0.01));
    const fxzy = (5 ** (2 ** 3));
    {((cond) => {if (!cond) throw new Error("assertion failed: fxzy == 390625")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(fxzy,390625)))};
    const xyzf = Math.trunc(501 / (99 + 1));
    {((cond) => {if (!cond) throw new Error("assertion failed: xyzf == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(xyzf,5)))};
    const xyznf = Math.trunc((-501) / (99 + 1));
    {((cond) => {if (!cond) throw new Error("assertion failed: xyznf == -5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(xyznf,(-5))))};
    const xyznfj = Math.trunc(501.9 / ((-99.1) - 0.91));
    {((cond) => {if (!cond) throw new Error("assertion failed: xyznfj == -5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(xyznfj,(-5))))};
    const xynfj = Math.trunc((-501.9) / ((-99.1) - 0.91));
    {((cond) => {if (!cond) throw new Error("assertion failed: xynfj == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(xynfj,5)))};
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "expressions_binary_operators.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

