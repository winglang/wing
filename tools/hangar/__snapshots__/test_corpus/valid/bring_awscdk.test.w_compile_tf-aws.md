# [bring_awscdk.test.w](../../../../../examples/tests/valid/bring_awscdk.test.w) | compile | tf-aws

## inflight.CdkDockerImageFunction-1.js
```js
"use strict";
module.exports = function({  }) {
  class CdkDockerImageFunction {
    constructor({  }) {
    }
  }
  return CdkDockerImageFunction;
}

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
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const awscdk = require("aws-cdk-lib");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class CdkDockerImageFunction extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.function = this.node.root.new("aws-cdk-lib.aws_lambda.DockerImageFunction",awscdk.aws_lambda.DockerImageFunction,this, "DockerImageFunction", ({"code": (awscdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"))}));
      }
      static _toInflightType(context) {
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
        return ["$inflight_init"];
      }
    }
    this.node.root.new("aws-cdk-lib.App",awscdk.App,);
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_awscdk.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

