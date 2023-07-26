# [forward_decl.w](../../../../../examples/tests/valid/forward_decl.w) | compile | tf-aws

## inflight.R.js
```js
module.exports = function({  }) {
  class R {
    constructor({  }) {
    }
  }
  return R;
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class R extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.f = "Hello World!!!";
        this._addInflightOps("$inflight_init");
      }
      method2() {
        (this.method1());
        {console.log("preflight" === 'inflight' && process.env.WING_TARGET !== 'sim' ? 'winglogstart:' + (String.raw({ raw: ["", ""] }, this.f)) + ':winglogend': (String.raw({ raw: ["", ""] }, this.f)))};
        (this.method2());
      }
      method1() {
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.R.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const RClient = ${R._toInflightType(this).text};
            const client = new RClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    const x = "hi";
    if (true) {
      {console.log("preflight" === 'inflight' && process.env.WING_TARGET !== 'sim' ? 'winglogstart:' + (String.raw({ raw: ["", ""] }, x)) + ':winglogend': (String.raw({ raw: ["", ""] }, x)))};
      const y = new R(this,"R");
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "forward_decl", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

