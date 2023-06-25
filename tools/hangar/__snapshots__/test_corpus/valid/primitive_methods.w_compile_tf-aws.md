# [primitive_methods.w](../../../../../examples/tests/valid/primitive_methods.w) | compile | tf-aws

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
    const dur = $stdlib.std.Duration.fromSeconds(60);
    const dur2 = $stdlib.std.Duration.fromSeconds(600);
    const f =  (d) =>  {
    }
    ;
    const stringy = `${dur.minutes}:${dur.seconds}`;
    {console.log(stringy)};
    if ((stringy.includes("60") && (((stringy.split(":")).at(0)) === "60"))) {
      {console.log(`${stringy.length}!`)};
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("123") === 123)'`)})((((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("123") === 123))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "primitive_methods", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

