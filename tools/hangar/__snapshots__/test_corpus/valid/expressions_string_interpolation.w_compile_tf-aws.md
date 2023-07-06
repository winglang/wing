# [expressions_string_interpolation.w](../../../../../examples/tests/valid/expressions_string_interpolation.w) | compile | tf-aws

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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const regularString = "str\n\"";
    const emptyString = "";
    const number = 1;
    const coolString = String.raw({ raw: ["cool \"\${", "}\" test"] }, regularString);
    const reallyCoolString = String.raw({ raw: ["", "", "\n", "\n\${empty_string}", "!"] }, number, emptyString, coolString, "string-in-string");
    const beginingWithCoolStrings = String.raw({ raw: ["", " ", " <- cool"] }, regularString, number);
    const endingWithCoolStrings = String.raw({ raw: ["cool -> ", " ", ""] }, regularString, number);
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "expressions_string_interpolation", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

