# [json_string_interpolation.w](../../../../../examples/tests/valid/json_string_interpolation.w) | compile | tf-aws

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
    const obj = Object.freeze({"strValue":"test","numValue":1});
    const notStringifyStrValue = String.raw({ raw: ["string: ", ""] }, ((e) => typeof e === 'string' ? e : JSON.stringify(e, null, 2))((obj)["strValue"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: notStringifyStrValue == \"string: test\"")})((notStringifyStrValue === "string: test"))};
    const stringifyNumValue = String.raw({ raw: ["number: ", ""] }, ((e) => typeof e === 'string' ? e : JSON.stringify(e, null, 2))((obj)["numValue"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: stringifyNumValue == \"number: 1\"")})((stringifyNumValue === "number: 1"))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json_string_interpolation", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

