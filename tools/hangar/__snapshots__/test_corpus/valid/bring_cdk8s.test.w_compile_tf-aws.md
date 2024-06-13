# [bring_cdk8s.test.w](../../../../../examples/tests/valid/bring_cdk8s.test.w) | compile | tf-aws

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
const cdk8s = require("cdk8s");
const kplus = require("cdk8s-plus-27");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const app = this.node.root.new("cdk8s.App", cdk8s.App, );
    const chart = this.node.root.new("cdk8s.Chart", cdk8s.Chart, this, "Chart");
    const deploy = ($scope => $scope.node.root.new("cdk8s-plus-27.Deployment", kplus.Deployment, $scope, "Deployment"))(chart);
    (deploy.addContainer(({"image": "hashicorp/http-echo", "args": ["-text", "text"], "portNumber": 5678})));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_cdk8s.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

