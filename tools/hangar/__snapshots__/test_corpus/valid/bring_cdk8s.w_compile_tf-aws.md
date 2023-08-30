# [bring_cdk8s.w](../../../../../examples/tests/valid/bring_cdk8s.w) | compile | tf-aws

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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cdk8s = require("cdk8s");
const kplus = require("cdk8s-plus-27");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const app = this.node.root.new("cdk8s.App",cdk8s.App,);
    const chart = this.node.root.new("cdk8s.Chart",cdk8s.Chart,this,"cdk8s.Chart");
    const deploy = this.node.root.new("cdk8s-plus-27.Deployment",kplus.Deployment,chart,"kplus.Deployment");
    (deploy.addContainer(({"image": "hashicorp/http-echo","args": ["-text", "text"],"portNumber": 5678})));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_cdk8s", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

