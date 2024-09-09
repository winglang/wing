# [primitive_methods.test.w](../../../../../tests/valid/primitive_methods.test.w) | compile | tf-aws

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
    const dur = (std.Duration.fromSeconds(60));
    const dur2 = (std.Duration.fromSeconds(600));
    const f = ((d) => {
    });
    const stringy = String.raw({ raw: ["", ":", ""] }, dur.minutes, dur.seconds);
    console.log(stringy);
    if (($macros.__String_contains(false, stringy, "60") && $helpers.eq($macros.__Array_at(false, (stringy.split(":")), 0), "60"))) {
      console.log(String.raw({ raw: ["", "!"] }, stringy.length));
    }
    $helpers.assert($helpers.eq($macros.__Number_fromStr(false, std.Number, "123"), 123), "num.fromStr(\"123\") == 123");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "primitive_methods.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

