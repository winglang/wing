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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const obj = ({"strValue": "test","numValue": 1});
    const notStringifyStrValue = String.raw({ raw: ["string: ", ""] }, JSON.stringify((obj)["strValue"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: notStringifyStrValue == \"string: \\\"test\\\"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(notStringifyStrValue,"string: \"test\"")))};
    const stringifyNumValue = String.raw({ raw: ["number: ", ""] }, JSON.stringify((obj)["numValue"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: stringifyNumValue == \"number: 1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(stringifyNumValue,"number: 1")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${obj}\" == Json.stringify(obj)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, JSON.stringify(obj)),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj]))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${obj.get(\"strValue\")}\" == Json.stringify(obj.get(\"strValue\"))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, JSON.stringify((obj)["strValue"])),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(obj)["strValue"]]))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: obj.get(\"strValue\") == Json.parse(Json.stringify(obj.get(\"strValue\")))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((obj)["strValue"],(JSON.parse(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(obj)["strValue"]]))))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: obj.get(\"strValue\") == Json.parse(\"${obj.get(\"strValue\")}\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((obj)["strValue"],(JSON.parse(String.raw({ raw: ["", ""] }, JSON.stringify((obj)["strValue"])))))))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json_string_interpolation", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

