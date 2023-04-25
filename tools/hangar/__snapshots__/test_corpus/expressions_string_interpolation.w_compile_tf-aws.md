# [expressions_string_interpolation.w](../../../../examples/tests/valid/expressions_string_interpolation.w) | compile | tf-aws

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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const regular_string = "str\n\"";
    const empty_string = "";
    const number = 1;
    const cool_string = `cool \"\${${regular_string}}\" test`;
    const really_cool_string = `${number}${empty_string}\n${cool_string}\n\${empty_string}${"string-in-string"}!`;
    const begining_with_cool_strings = `${regular_string} ${number} <- cool`;
    const ending_with_cool_strings = `cool -> ${regular_string} ${number}`;
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

