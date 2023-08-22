# [inflight_class_modifiers.w](../../../../../examples/tests/valid/inflight_class_modifiers.w) | compile | tf-aws

## inflight.C-1.js
```js
module.exports = function({  }) {
  class C {
    async method() {
    }
    constructor() {
      this.field = 12;
    }
  }
  return C;
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
class $Root extends $constructs.Construct {
  constructor(scope, id) {
    super(scope, id);
    class C extends $constructs.Construct {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.C-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const CClient = ${C._toInflightType(this)};
            const client = new CClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["field", "method", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $stdlib.std.Resource._registerBindObject(this, host, ["field"]);
        }
      }
      static _registerTypeBind(host, ops) {
      }
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_modifiers", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

