# [while.test.w](../../../../../examples/tests/valid/while.test.w) | compile | tf-aws

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
    while (false) {
      const x = 1;
    }
    const y = 123;
    while ((y < 0)) {
      const x = 1;
    }
    let z = 0;
    while (true) {
      z = (z + 1);
      if ((z > 2)) {
        break;
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: z == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(z,3)))};
    while (true) {
      break;
    }
    let v = 0;
    let i = 0;
    while ((i < 10)) {
      i = (i + 1);
      if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((i % 2),0))) {
        continue;
      }
      v = (v + 1);
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: i == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(i,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: v == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(v,5)))};
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "while.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

