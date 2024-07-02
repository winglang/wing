# [optional_macros.test.w](../../../../../examples/tests/valid/optional_macros.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = ({});
      (await $expect_Util.equal((result.item === undefined ? undefined : (result.item)?.["id"]), undefined));
      (await $expect_Util.equal((result.item === undefined ? undefined : ((obj, key) => { return obj.hasOwnProperty(key); })(result.item,"id")), undefined));
      (await $expect_Util.equal((result.items?.at(0) === undefined ? undefined : (result.items?.at(0))?.["id"]), undefined));
      (await $expect_Util.equal((result.items?.at(0) === undefined ? undefined : ((obj, key) => { return obj.hasOwnProperty(key); })(result.items?.at(0),"id")), undefined));
      (await $expect_Util.equal((result.mapItem === undefined ? undefined : (result.mapItem)["a"]), undefined));
      (await $expect_Util.equal((result.mapItem === undefined ? undefined : ("id" in (result.mapItem))), undefined));
      (await $expect_Util.equal((result.mapItems?.at(0) === undefined ? undefined : (result.mapItems?.at(0))["id"]), undefined));
      (await $expect_Util.equal((result.mapItems?.at(0) === undefined ? undefined : ("id" in (result.mapItems?.at(0)))), undefined));
      (await $expect_Util.equal(result.setItem?.size, undefined));
      (await $expect_Util.equal((await result.setItem?.has?.(6)), undefined));
      (await $expect_Util.equal((result.setItems === undefined ? undefined : result.setItems?.at(0))?.size, undefined));
      (await $expect_Util.equal((await (result.setItems === undefined ? undefined : result.setItems?.at(0))?.has?.(6)), undefined));
      (await $expect_Util.equal(result.structItem?.item, undefined));
      (await $expect_Util.equal((result.structItems === undefined ? undefined : result.structItems?.at(0))?.item, undefined));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:optional chaining macros", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "optional_macros.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

