# [implicit_std.test.w](../../../../../examples/tests/valid/implicit_std.test.w) | compile | tf-aws

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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const d = (std.Duration.fromMinutes(5));
    const n = ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return Number(args) })("12");
    $helpers.assert($helpers.eq(d.seconds, (5 * 60)), "d.seconds == 5 * 60");
    $helpers.assert($helpers.eq(n, 12), "n == 12");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "implicit_std.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

