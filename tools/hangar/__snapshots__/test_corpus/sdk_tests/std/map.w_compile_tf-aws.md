# [map.w](../../../../../../examples/tests/sdk_tests/std/map.w) | compile | tf-aws

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
    const m = Object.freeze({"hello":123,"world":99});
    const mkeys = Object.keys(m);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(mkeys.length === 2)'`)})((mkeys.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((mkeys.at(0)) === "hello")'`)})(((mkeys.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((mkeys.at(1)) === "world")'`)})(((mkeys.at(1)) === "world"))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "map", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

