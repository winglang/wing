# [sim_resource.test.w](../../../../../tests/valid/sim_resource.test.w) | compile | tf-aws

## inflight.ResourceBackend-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $MyEnum }) {
  class ResourceBackend {
    async onStop() {
    }
    async emptyMethod() {
    }
    async methodWithNums(a, b) {
      return 0;
    }
    async methodWithStrs(a, b) {
      return "";
    }
    async methodWithBools(a, b) {
      return false;
    }
    async methodWithOptionals(a, b) {
    }
    async methodWithJsons(a, b) {
      return ({});
    }
    async methodWithEnums(a, b) {
      return $MyEnum.A;
    }
    async methodWithArrays(a, b) {
      return [];
    }
    async methodWithMaps(a, b) {
      return ({});
    }
    async methodWithStructs(a, b) {
      return ({"a": 0, "b": ""});
    }
    async methodWithVariadics(a, ...b) {
    }
    async methodWithComplexTypes(a) {
      return ({});
    }
  }
  return ResourceBackend;
}
//# sourceMappingURL=inflight.ResourceBackend-1.cjs.map
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
    const sim = $stdlib.sim;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const MyEnum =
      (function (tmp) {
        tmp["A"] = "A";
        tmp["B"] = "B";
        tmp["C"] = "C";
        return tmp;
      })({})
    ;
    class ResourceBackend extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ResourceBackend-1.cjs")({
            $MyEnum: ${$stdlib.core.liftObject(MyEnum)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "onStop": [
          ],
          "emptyMethod": [
          ],
          "methodWithNums": [
          ],
          "methodWithStrs": [
          ],
          "methodWithBools": [
          ],
          "methodWithOptionals": [
          ],
          "methodWithJsons": [
          ],
          "methodWithEnums": [
            [MyEnum, ["A"]],
          ],
          "methodWithArrays": [
          ],
          "methodWithMaps": [
          ],
          "methodWithStructs": [
          ],
          "methodWithVariadics": [
          ],
          "methodWithComplexTypes": [
          ],
          "$inflight_init": [
            [MyEnum, []],
          ],
        });
      }
    }
    if ($preflightTypesMap[1]) { throw new Error("ResourceBackend is already in type map"); }
    $preflightTypesMap[1] = ResourceBackend;
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "sim_resource.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

