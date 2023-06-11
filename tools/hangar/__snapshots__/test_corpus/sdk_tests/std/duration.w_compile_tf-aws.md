# [duration.w](../../../../../../examples/tests/sdk_tests/std/duration.w) | compile | tf-aws

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
    {((cond) => {if (!cond) throw new Error(`assertion failed: '($stdlib.std.Duration.fromSeconds(12).seconds === 12)'`)})(($stdlib.std.Duration.fromSeconds(12).seconds === 12))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '($stdlib.std.Duration.fromSeconds(720).seconds === (12 * 60))'`)})(($stdlib.std.Duration.fromSeconds(720).seconds === (12 * 60)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '($stdlib.std.Duration.fromSeconds(43200).seconds === ((12 * 60) * 60))'`)})(($stdlib.std.Duration.fromSeconds(43200).seconds === ((12 * 60) * 60)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '($stdlib.std.Duration.fromSeconds(1036800).seconds === (((12 * 60) * 60) * 24))'`)})(($stdlib.std.Duration.fromSeconds(1036800).seconds === (((12 * 60) * 60) * 24)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '($stdlib.std.Duration.fromSeconds(31536000).seconds === (12 * 2628000))'`)})(($stdlib.std.Duration.fromSeconds(31536000).seconds === (12 * 2628000)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '($stdlib.std.Duration.fromSeconds(378432000).seconds === (12 * 31536000))'`)})(($stdlib.std.Duration.fromSeconds(378432000).seconds === (12 * 31536000)))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "duration", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

