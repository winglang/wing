# [bring_awscdk.test.w](../../../../../examples/tests/valid/bring_awscdk.test.w) | compile | tf-aws

## inflight.CdkDockerImageFunction-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class CdkDockerImageFunction {
    constructor({  }) {
    }
  }
  return CdkDockerImageFunction;
}
//# sourceMappingURL=inflight.CdkDockerImageFunction-1.js.map
```

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
const awscdk = require("aws-cdk-lib");
const $PlatformManager = require('./platform_manager.js');
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class CdkDockerImageFunction extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.function = $PlatformManager.new("aws-cdk-lib.aws_lambda.DockerImageFunction", awscdk.aws_lambda.DockerImageFunction, this, "DockerImageFunction", ({"code": (awscdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"))}));
      }
      static _toInflightType() {
        return `
          require("./inflight.CdkDockerImageFunction-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const CdkDockerImageFunctionClient = ${CdkDockerImageFunction._toInflightType(this)};
            const client = new CdkDockerImageFunctionClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    $PlatformManager.new("aws-cdk-lib.App", awscdk.App, );
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_awscdk.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

