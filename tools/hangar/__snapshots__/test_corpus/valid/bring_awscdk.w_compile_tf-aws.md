# [bring_awscdk.w](../../../../../examples/tests/valid/bring_awscdk.w) | compile | tf-aws

## inflight.CdkDockerImageFunction-1.js
```js
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
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
const $stdlib = require('@winglang/sdk');
const $constructs = require('constructs');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const awscdk = require("aws-cdk-lib");
class $Root extends $constructs.Construct {
  constructor(scope, id) {
    super(scope, id);
    class CdkDockerImageFunction extends $constructs.Construct {
      constructor(scope, id, ) {
        super(scope, id);
        this.function = this.node.root.new("aws-cdk-lib.aws_lambda.DockerImageFunction",awscdk.aws_lambda.DockerImageFunction,this,"DockerImageFunction",({"code": (awscdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"))}));
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
      _getInflightOps() {
        return ["$inflight_init"];
      }
      _registerBind(host, ops) {
      }
      static _registerTypeBind(host, ops) {
      }
    }
    this.node.root.new("aws-cdk-lib.App",awscdk.App,);
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_awscdk", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

