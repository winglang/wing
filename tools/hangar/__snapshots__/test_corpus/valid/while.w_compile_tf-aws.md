# [while.w](../../../../../examples/tests/valid/while.w) | compile | tf-aws

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
    {((cond) => {if (!cond) throw new Error("assertion failed: z == 3")})((z === 3))};
    while (true) {
      break;
    }
    let v = 0;
    let i = 0;
    while ((i < 10)) {
      i = (i + 1);
      if (((i % 2) === 0)) {
        continue;
      }
      v = (v + 1);
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: i == 10")})((i === 10))};
    {((cond) => {if (!cond) throw new Error("assertion failed: v == 5")})((v === 5))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "while", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

