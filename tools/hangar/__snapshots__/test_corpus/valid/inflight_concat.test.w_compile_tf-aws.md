# [inflight_concat.test.w](../../../../../examples/tests/valid/inflight_concat.test.w) | compile | tf-aws

## inflight.R-1.js
```js
"use strict";
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class R extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
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
      _supportedOps() {
        return ["foo", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          R._registerOnLiftObject((this.s1.concat(" world")), host, []);
        }
        if (ops.includes("foo")) {
          R._registerOnLiftObject((this.s1.concat(" world")), host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const r = new R(this, "R");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_concat.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

