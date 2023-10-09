# [sleep.test.w](../../../../../../examples/tests/sdk_tests/util/sleep.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $JSHelper, $oneHundredMiliseconds, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const start = (await $JSHelper.getTime());
      (await $util_Util.sleep($oneHundredMiliseconds));
      const end = (await $JSHelper.getTime());
      const delta = (end - start);
      {((cond) => {if (!cond) throw new Error("assertion failed: delta >= 100")})((delta >= 100))};
    }
  }
  return $Closure1;
}

```

## inflight.JSHelper-1.js
```js
module.exports = function({  }) {
  class JSHelper {
    constructor({  }) {
    }
    static async getTime() {
      return (require("<ABSOLUTE_PATH>/sleep-helper.js")["getTime"])()
    }
  }
  return JSHelper;
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
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class JSHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.JSHelper-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const JSHelperClient = ${JSHelper._toInflightType(this)};
            const client = new JSHelperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["getTime", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $oneHundredMiliseconds: ${context._lift(oneHundredMiliseconds)},
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(JSHelper, host, ["getTime"]);
          $Closure1._registerBindObject(oneHundredMiliseconds, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const oneHundredMiliseconds = (std.Duration.fromSeconds(0.1));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:sleep 100 mili seconds",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "sleep.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

