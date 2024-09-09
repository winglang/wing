# [json_string_interpolation.test.w](../../../../../tests/valid/json_string_interpolation.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const obj = ({"strValue": "test", "numValue": 1});
    const notStringifyStrValue = String.raw({ raw: ["string: ", ""] }, JSON.stringify($macros.__Json_get(false, obj, "strValue")));
    $helpers.assert($helpers.eq(notStringifyStrValue, "string: \"test\""), "notStringifyStrValue == \"string: \\\"test\\\"\"");
    const stringifyNumValue = String.raw({ raw: ["number: ", ""] }, JSON.stringify($macros.__Json_get(false, obj, "numValue")));
    $helpers.assert($helpers.eq(stringifyNumValue, "number: 1"), "stringifyNumValue == \"number: 1\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, JSON.stringify(obj)), $macros.__Json_stringify(false, std.Json, obj)), "\"{obj}\" == Json.stringify(obj)");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, JSON.stringify($macros.__Json_get(false, obj, "strValue"))), $macros.__Json_stringify(false, std.Json, $macros.__Json_get(false, obj, "strValue"))), "\"{obj.get(\"strValue\")}\" == Json.stringify(obj.get(\"strValue\"))");
    $helpers.assert($helpers.eq($macros.__Json_get(false, obj, "strValue"), $macros.__Json_parse(false, std.Json, $macros.__Json_stringify(false, std.Json, $macros.__Json_get(false, obj, "strValue")))), "obj.get(\"strValue\") == Json.parse(Json.stringify(obj.get(\"strValue\")))");
    $helpers.assert($helpers.eq($macros.__Json_get(false, obj, "strValue"), $macros.__Json_parse(false, std.Json, String.raw({ raw: ["", ""] }, JSON.stringify($macros.__Json_get(false, obj, "strValue"))))), "obj.get(\"strValue\") == Json.parse(\"{obj.get(\"strValue\")}\")");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json_string_interpolation.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

