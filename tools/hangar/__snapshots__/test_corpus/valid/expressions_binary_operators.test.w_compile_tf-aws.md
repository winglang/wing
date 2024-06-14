# [expressions_binary_operators.test.w](../../../../../examples/tests/valid/expressions_binary_operators.test.w) | compile | tf-aws

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
globalThis.$PolyconFactory = $PlatformManager.createPolyconFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const x = (-1);
    const y = (2 * x);
    const z = ((x + y) - 1);
    const xyz = (((y * y) / (x * x)) * z);
    const xf = 1;
    const yf = ((-20.22) * xf);
    const zf = ((xf + yf) - (-0.01));
    const fxzy = (5 ** (2 ** 3));
    $helpers.assert($helpers.eq(fxzy, 390625), "fxzy == 390625");
    const xyzf = Math.trunc(501 / (99 + 1));
    $helpers.assert($helpers.eq(xyzf, 5), "xyzf == 5");
    const xyznf = Math.trunc((-501) / (99 + 1));
    $helpers.assert($helpers.eq(xyznf, (-5)), "xyznf == -5");
    const xyznfj = Math.trunc(501.9 / ((-99.1) - 0.91));
    $helpers.assert($helpers.eq(xyznfj, (-5)), "xyznfj == -5");
    const xynfj = Math.trunc((-501.9) / ((-99.1) - 0.91));
    $helpers.assert($helpers.eq(xynfj, 5), "xynfj == 5");
    const price = 12.34;
    const twentyThousand = 20000;
    const aBitMore = 20000.0001;
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "expressions_binary_operators.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], polyconFactory: globalThis.$PolyconFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

