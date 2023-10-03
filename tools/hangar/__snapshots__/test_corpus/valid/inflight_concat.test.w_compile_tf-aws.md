# [inflight_concat.test.w](../../../../../examples/tests/valid/inflight_concat.test.w) | compile | tf-aws

## inflight.R-1.js
```js
module.exports = function({  }) {
  class R {
    constructor({ $_this_s1_concat___world___ }) {
      this.$_this_s1_concat___world___ = $_this_s1_concat___world___;
    }
    async foo() {
      {console.log(this.$_this_s1_concat___world___)};
    }
    async $inflight_init() {
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class R extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.s1 = "hello";
      }
      static _toInflightType(context) {
        return `
          require("./inflight.R-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const RClient = ${R._toInflightType(this)};
            const client = new RClient({
              $_this_s1_concat___world___: ${this._lift((this.s1.concat(" world")))},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["foo", "$inflight_init"];
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
new $App({ outdir: $outdir, name: "inflight_concat.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

