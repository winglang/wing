# [optional_macros.test.w](../../../../../examples/tests/valid/optional_macros.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $expect_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = ({});
      (await $expect_Util.equal($macros.__Json_tryGet(true, result.item, "id"), undefined));
      (await $expect_Util.equal($macros.__Json_has(true, result.item, "id"), undefined));
      (await $expect_Util.equal($macros.__Json_tryGet(true, $macros.__Array_tryAt(true, result.items, 0), "id"), undefined));
      (await $expect_Util.equal($macros.__Json_has(true, $macros.__Array_tryAt(true, result.items, 0), "id"), undefined));
      (await $expect_Util.equal($macros.__Map_tryGet(true, result.mapItem, "a"), undefined));
      (await $expect_Util.equal($macros.__Map_has(true, result.mapItem, "id"), undefined));
      (await $expect_Util.equal($macros.__Map_tryGet(true, $macros.__Array_tryAt(true, result.mapItems, 0), "id"), undefined));
      (await $expect_Util.equal($macros.__Map_has(true, $macros.__Array_tryAt(true, result.mapItems, 0), "id"), undefined));
      (await $expect_Util.equal(result.setItem?.size, undefined));
      (await $expect_Util.equal((await result.setItem?.has?.(6)), undefined));
      (await $expect_Util.equal($macros.__Array_tryAt(true, result.setItems, 0)?.size, undefined));
      (await $expect_Util.equal((await $macros.__Array_tryAt(true, result.setItems, 0)?.has?.(6)), undefined));
      (await $expect_Util.equal(result.structItem?.item, undefined));
      (await $expect_Util.equal($macros.__Array_tryAt(true, result.structItems, 0)?.item, undefined));
      let calls = 0;
      const makeArray = (async () => {
        calls = (calls + 1);
        return [1, 2, 3];
      });
      (await $expect_Util.ok(($macros.__Array_contains(true, (await makeArray()), 2) ?? false)));
      (await $expect_Util.equal(calls, 1));
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
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
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
            [$stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"), [].concat(["equal"], ["ok"])],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"), []],
          ],
        });
      }
    }
    const result = ({});
    (expect.Util.equal($macros.__Json_tryGet(true, result.item, "id"), undefined));
    (expect.Util.equal($macros.__Json_has(true, result.item, "id"), undefined));
    (expect.Util.equal($macros.__Json_tryGet(true, $macros.__Array_tryAt(true, result.items, 0), "id"), undefined));
    (expect.Util.equal($macros.__Json_has(true, $macros.__Array_tryAt(true, result.items, 0), "id"), undefined));
    (expect.Util.equal($macros.__Map_tryGet(true, result.mapItem, "a"), undefined));
    (expect.Util.equal($macros.__Map_has(true, result.mapItem, "id"), undefined));
    (expect.Util.equal($macros.__Map_tryGet(true, $macros.__Array_tryAt(true, result.mapItems, 0), "id"), undefined));
    (expect.Util.equal($macros.__Map_has(true, $macros.__Array_tryAt(true, result.mapItems, 0), "id"), undefined));
    (expect.Util.equal(result.setItem?.size, undefined));
    (expect.Util.equal((result.setItem?.has?.(6)), undefined));
    (expect.Util.equal($macros.__Array_tryAt(true, result.setItems, 0)?.size, undefined));
    (expect.Util.equal(($macros.__Array_tryAt(true, result.setItems, 0)?.has?.(6)), undefined));
    (expect.Util.equal(result.structItem?.item, undefined));
    (expect.Util.equal($macros.__Array_tryAt(true, result.structItems, 0)?.item, undefined));
    let calls = 0;
    const makeArray = (() => {
      calls = (calls + 1);
      return [1, 2, 3];
    });
    (expect.Util.ok(($macros.__Array_contains(true, (makeArray()), 2) ?? false)));
    (expect.Util.equal(calls, 1));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:optional chaining macros", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "optional_macros.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

