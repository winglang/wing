# [debug_env.test.w](../../../../../examples/tests/valid/debug_env.test.w) | compile | tf-aws

## inflight.A-1.js
```js
"use strict";
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
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
"use strict";
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["$inflight_init"];
      }
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "debug_env.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

