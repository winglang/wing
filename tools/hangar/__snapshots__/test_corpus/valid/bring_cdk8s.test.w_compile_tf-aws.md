# [bring_cdk8s.test.w](../../../../../examples/tests/valid/bring_cdk8s.test.w) | compile | tf-aws

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
    const cdk8s = require("cdk8s");
    const kplus = require("cdk8s-plus-27");
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const app = globalThis.$ClassFactory.new("cdk8s.App", cdk8s.App, );
    const chart = globalThis.$ClassFactory.new("cdk8s.Chart", cdk8s.Chart, this, "Chart");
    const deploy = globalThis.$ClassFactory.new("cdk8s-plus-27.Deployment", kplus.Deployment, chart, "Deployment");
    (deploy.addContainer(({"image": "hashicorp/http-echo", "args": ["-text", "text"], "portNumber": 5678})));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_cdk8s.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

