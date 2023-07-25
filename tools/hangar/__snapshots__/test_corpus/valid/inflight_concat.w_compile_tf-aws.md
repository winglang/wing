# [inflight_concat.w](../../../../../examples/tests/valid/inflight_concat.w) | compile | tf-aws

## inflight.R.js
```js
module.exports = function({  }) {
  class R {
    constructor({ $_this_s1_concat___world___ }) {
      this.$_this_s1_concat___world___ = $_this_s1_concat___world___;
    }
    async foo() {
      {console.log(this.$_this_s1_concat___world___)};
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class R extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.s1 = "hello";
        this._addInflightOps("foo", "$inflight_init");
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
              $_this_s1_concat___world___: ${this._lift((this.s1.concat(" world")))},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          R._registerBindObject((this.s1.concat(" world")), host, []);
        }
        if (ops.includes("foo")) {
          R._registerBindObject((this.s1.concat(" world")), host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const r = new R(this,"R");
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_concat", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

