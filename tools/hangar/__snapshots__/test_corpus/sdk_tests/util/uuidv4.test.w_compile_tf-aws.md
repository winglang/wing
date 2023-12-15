# [uuidv4.test.w](../../../../../../examples/tests/sdk_tests/util/uuidv4.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $JSHelperInflight, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const data = (await $util_Util.uuidv4());
      {((cond) => {if (!cond) throw new Error("assertion failed: JSHelperInflight.validateUUIDv4(data) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $JSHelperInflight.validateUUIDv4(data)),true)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.JSHelper-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class JSHelper {
    constructor({  }) {
    }
  }
  return JSHelper;
}
//# sourceMappingURL=./inflight.JSHelper-1.cjs.map
```

## inflight.JSHelperInflight-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class JSHelperInflight {
    constructor({  }) {
    }
    static async validateUUIDv4(uuidv4) {
      return (require("<ABSOLUTE_PATH>/uuidv4-helper.js")["validateUUIDv4"])(uuidv4)
    }
  }
  return JSHelperInflight;
}
//# sourceMappingURL=./inflight.JSHelperInflight-1.cjs.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class JSHelper extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static validateUUIDv4(uuidv4) {
        return (require("<ABSOLUTE_PATH>/uuidv4-helper.js")["validateUUIDv4"])(uuidv4)
      }
      static _toInflightType() {
        return `
          require("././inflight.JSHelper-1.cjs")({
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
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class JSHelperInflight extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("././inflight.JSHelperInflight-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const JSHelperInflightClient = ${JSHelperInflight._toInflightType(this)};
            const client = new JSHelperInflightClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "validateUUIDv4", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $JSHelperInflight: ${$stdlib.core.liftObject(JSHelperInflight)},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(JSHelperInflight, host, ["validateUUIDv4"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const data = (util.Util.uuidv4());
    {((cond) => {if (!cond) throw new Error("assertion failed: JSHelper.validateUUIDv4(data) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((JSHelper.validateUUIDv4(data)),true)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight uuidv4", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "uuidv4.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

