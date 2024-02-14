# [json_string_interpolation.test.w](../../../../../examples/tests/valid/json_string_interpolation.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
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
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const obj = ({"strValue": "test", "numValue": 1});
    const notStringifyStrValue = String.raw({ raw: ["string: ", ""] }, JSON.stringify(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "strValue")));
    $helpers.assert($helpers.eq(notStringifyStrValue, "string: \"test\""), "notStringifyStrValue == \"string: \\\"test\\\"\"");
    const stringifyNumValue = String.raw({ raw: ["number: ", ""] }, JSON.stringify(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "numValue")));
    $helpers.assert($helpers.eq(stringifyNumValue, "number: 1"), "stringifyNumValue == \"number: 1\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, JSON.stringify(obj)), ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(obj)), "\"{obj}\" == Json.stringify(obj)");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, JSON.stringify(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "strValue"))), ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "strValue"))), "\"{obj.get(\"strValue\")}\" == Json.stringify(obj.get(\"strValue\"))");
    $helpers.assert($helpers.eq(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "strValue"), JSON.parse(((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "strValue")))), "obj.get(\"strValue\") == Json.parse(Json.stringify(obj.get(\"strValue\")))");
    $helpers.assert($helpers.eq(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "strValue"), JSON.parse(String.raw({ raw: ["", ""] }, JSON.stringify(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "strValue"))))), "obj.get(\"strValue\") == Json.parse(\"{obj.get(\"strValue\")}\")");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json_string_interpolation.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

