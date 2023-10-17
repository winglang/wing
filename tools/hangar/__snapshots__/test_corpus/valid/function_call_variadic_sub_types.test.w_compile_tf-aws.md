# [function_call_variadic_sub_types.test.w](../../../../../examples/tests/valid/function_call_variadic_sub_types.test.w) | compile | tf-aws

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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const func = ((...events) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: events.at(0) == \"str\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((events.at(0)),"str")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: events.at(1) == \"str\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((events.at(1)),"str")))};
    });
    const jsonStr = "str";
    (func("str",jsonStr));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "function_call_variadic_sub_types.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

