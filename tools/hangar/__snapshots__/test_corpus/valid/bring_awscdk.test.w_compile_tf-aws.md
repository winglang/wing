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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const awscdk = require("aws-cdk-lib");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class CdkDockerImageFunction extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.function = this.node.root.new("aws-cdk-lib.aws_lambda.DockerImageFunction", awscdk.aws_lambda.DockerImageFunction, this, "DockerImageFunction", ({"code": (awscdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"))}));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.CdkDockerImageFunction-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const CdkDockerImageFunctionClient = ${CdkDockerImageFunction._toInflightType()};
            const client = new CdkDockerImageFunctionClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    this.node.root.new("aws-cdk-lib.App", awscdk.App, );
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

