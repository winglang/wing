# [on_lift.test.w](../../../../../tests/valid/on_lift.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Foo, $foo }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $foo.m1());
      (await $Foo.m2());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $util_Util }) {
  class Foo {
    async m1() {
      console.log("I'm expecting ABC to be set");
      $helpers.assert($helpers.eq((await $util_Util.env("ABC")), "123"), "util.env(\"ABC\") == \"123\"");
    }
    static async m2() {
      console.log("I'm expecting XYZ to be set");
      $helpers.assert($helpers.eq((await $util_Util.env("XYZ")), "789"), "util.env(\"XYZ\") == \"789\"");
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
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
    const util = $stdlib.util;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      onLift(host, ops) {
        if ($macros.__Array_contains(false, ops, "m1")) {
          (host.addEnvironment("ABC", "123"));
        }
      }
      static onLiftType(host, ops) {
        if ($macros.__Array_contains(false, ops, "m2")) {
          (host.addEnvironment("XYZ", "789"));
        }
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "m1": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), ["env"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), []],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "m2": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), ["env"]],
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
            $foo: ${$stdlib.core.liftObject(foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [Foo, ["m2"]],
            [foo, ["m1"]],
          ],
          "$inflight_init": [
            [Foo, []],
            [foo, []],
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:onLift and onLiftType allow capabilities to be granted to inflight hosts", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "on_lift.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

