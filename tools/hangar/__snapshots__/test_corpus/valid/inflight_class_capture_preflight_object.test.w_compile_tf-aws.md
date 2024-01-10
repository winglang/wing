# [inflight_class_capture_preflight_object.test.w](../../../../../examples/tests/valid/inflight_class_capture_preflight_object.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $PlatformManager = require('./platform_manager.js');
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_capture_preflight_object.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

