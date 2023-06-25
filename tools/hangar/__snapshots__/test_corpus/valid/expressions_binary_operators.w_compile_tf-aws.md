# [expressions_binary_operators.w](../../../../../examples/tests/valid/expressions_binary_operators.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const x = (-1);
    const y = (2 * x);
    const z = ((x + y) - 1);
    const xyz = (((y * y) / (x * x)) * z);
    const xf = 1;
    const yf = ((-20.22) * xf);
    const zf = ((xf + yf) - (-0.01));
    const fxzy = (5 ** (2 ** 3));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(fxzy === 390625)'`)})((fxzy === 390625))};
    const xyzf = Math.trunc(501 / (99 + 1));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(xyzf === 5)'`)})((xyzf === 5))};
    const xyznf = Math.trunc((-501) / (99 + 1));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(xyznf === (-5))'`)})((xyznf === (-5)))};
    const xyznfj = Math.trunc(501.9 / ((-99.1) - 0.91));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(xyznfj === (-5))'`)})((xyznfj === (-5)))};
    const xynfj = Math.trunc((-501.9) / ((-99.1) - 0.91));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(xynfj === 5)'`)})((xynfj === 5))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "expressions_binary_operators", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

