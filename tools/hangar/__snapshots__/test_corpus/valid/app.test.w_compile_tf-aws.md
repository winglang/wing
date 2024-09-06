# [app.test.w](../../../../../tests/valid/app.test.w) | compile | tf-aws

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
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    (expect.Util.equal($macros.__String_contains(false, $helpers.nodeof(this).app.workdir, ".wing"), true));
    const path = $helpers.nodeof($helpers.nodeof(this).app).path;
    for (const c of $helpers.nodeof($helpers.nodeof(this).app).children) {
      console.log($helpers.nodeof(c).path);
    }
    (expect.Util.notNil($helpers.nodeof($helpers.nodeof(this).app)));
    (expect.Util.equal($macros.__Array_at(false, ($helpers.nodeof($helpers.nodeof(this).app).path.split("/")), 0), "root"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "app.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

