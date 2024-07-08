# [while.test.w](../../../../../examples/tests/valid/while.test.w) | compile | tf-aws

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
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
if (globalThis.$ClassFactory !== undefined) { throw new Error("$ClassFactory already defined"); }
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    while (false) {
      const x = 1;
    }
    const y = 123;
    while ((y < 0)) {
      const x = 1;
    }
    let z = 0;
    while (true) {
      z = (z + 1);
      if ((z > 2)) {
        break;
      }
    }
    $helpers.assert($helpers.eq(z, 3), "z == 3");
    while (true) {
      break;
    }
    let v = 0;
    let i = 0;
    while ((i < 10)) {
      i = (i + 1);
      if ($helpers.eq((i % 2), 0)) {
        continue;
      }
      v = (v + 1);
    }
    $helpers.assert($helpers.eq(i, 10), "i == 10");
    $helpers.assert($helpers.eq(v, 5), "v == 5");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "while.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

