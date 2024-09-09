# [capture_containers.test.w](../../../../../tests/valid/capture_containers.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $arr, $arrOfMap, $j, $myMap, $mySet }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($macros.__Array_at(false, $arr, 0), "hello"), "arr.at(0) == \"hello\"");
      $helpers.assert($helpers.eq($macros.__Array_at(false, $arr, 1), "world"), "arr.at(1) == \"world\"");
      $helpers.assert($helpers.eq($arr.length, 2), "arr.length == 2");
      $helpers.assert((await $mySet.has("my")), "mySet.has(\"my\")");
      $helpers.assert($helpers.eq($mySet.size, 2), "mySet.size == 2");
      $helpers.assert($macros.__Map_has(false, $myMap, "world"), "myMap.has(\"world\")");
      $helpers.assert($helpers.eq($macros.__Map_size(false, $myMap, ), 2), "myMap.size() == 2");
      $helpers.assert($macros.__Map_has(false, $macros.__Array_at(false, $arrOfMap, 0), "bang"), "arrOfMap.at(0).has(\"bang\")");
      $helpers.assert($helpers.eq($macros.__Json_get(false, $j, "b"), "world"), "j.get(\"b\") == \"world\"");
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
    const cloud = $stdlib.cloud;
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
            $arr: ${$stdlib.core.liftObject(arr)},
            $arrOfMap: ${$stdlib.core.liftObject(arrOfMap)},
            $j: ${$stdlib.core.liftObject(j)},
            $myMap: ${$stdlib.core.liftObject(myMap)},
            $mySet: ${$stdlib.core.liftObject(mySet)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [arr, [].concat(["at"], ["length"])],
            [arrOfMap, ["at"]],
            [j, ["get"]],
            [myMap, [].concat(["has"], ["size"])],
            [mySet, [].concat(["has"], ["size"])],
          ],
          "$inflight_init": [
            [arr, []],
            [arrOfMap, []],
            [j, []],
            [myMap, []],
            [mySet, []],
          ],
        });
      }
    }
    const arr = ["hello", "world"];
    const mySet = new Set(["my", "my", "set"]);
    const myMap = ({["hello"]: 123, ["world"]: 999});
    const arrOfMap = [({["bang"]: 123})];
    const j = ({"a": "hello", "b": "world"});
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:capture_containers", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_containers.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

