# [bring_awscdk.test.w](../../../../../tests/valid/bring_awscdk.test.w) | compile | tf-aws

## inflight.CdkDockerImageFunction-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class CdkDockerImageFunction {
  }
  return CdkDockerImageFunction;
}
//# sourceMappingURL=inflight.CdkDockerImageFunction-1.cjs.map
```

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
    const cdk = require("aws-cdk-lib");
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class CdkDockerImageFunction extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        const eventBridge = globalThis.$ClassFactory.new("aws-cdk-lib.aws_events.EventBus", cdk.aws_events.EventBus, this, "EventBridge", { eventBusName: "test" });
        const rule = globalThis.$ClassFactory.new("aws-cdk-lib.aws_events.CfnRule", cdk.aws_events.CfnRule, this, "CfnRule", { name: "test", eventBusName: eventBridge.eventBusName, eventPattern: ({}), targets: [({"arn": "", "id": ""})] });
        globalThis.$ClassFactory.new("aws-cdk-lib.aws_events.Rule", cdk.aws_events.Rule, this, "Rule", { eventPattern: ({"detailType": [""]}) });
        this.function = globalThis.$ClassFactory.new("aws-cdk-lib.aws_lambda.DockerImageFunction", cdk.aws_lambda.DockerImageFunction, this, "DockerImageFunction", ({"code": (cdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"))}));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.CdkDockerImageFunction-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    globalThis.$ClassFactory.new("aws-cdk-lib.App", cdk.App, );
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_awscdk.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

