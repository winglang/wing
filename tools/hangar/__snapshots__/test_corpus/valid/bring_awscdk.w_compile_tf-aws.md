# [bring_awscdk.w](../../../../../examples/tests/valid/bring_awscdk.w) | compile | tf-aws

## inflight.CdkDockerImageFunction.js
```js
module.exports = function({  }) {
  class CdkDockerImageFunction {
    constructor({ function }) {
      this.function = function;
    }
    async $inflight_init()  {
      const __parent_this = this;
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
      "version": "0.15.2"
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const awscdk = require("aws-cdk-lib");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class CdkDockerImageFunction extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.function = this.node.root.new("aws-cdk-lib.aws_lambda.DockerImageFunction",awscdk.aws_lambda.DockerImageFunction,this,"DockerImageFunction",{
        "code": (awscdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts")),}
        );
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.CdkDockerImageFunction.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const function_client = this._lift(this.function);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const CdkDockerImageFunctionClient = ${CdkDockerImageFunction._toInflightType(this).text};
            const client = new CdkDockerImageFunctionClient({
              function: ${function_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          CdkDockerImageFunction._registerBindObject(this.function, host, []);
        }
        super._registerBind(host, ops);
      }
    }
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bring_awscdk", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

