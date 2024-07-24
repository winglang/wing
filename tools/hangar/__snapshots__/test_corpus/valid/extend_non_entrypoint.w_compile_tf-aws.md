# [extend_non_entrypoint.w](../../../../../examples/tests/valid/extend_non_entrypoint.w) | compile | tf-aws

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $cdk8s_Chart }) {
  class Foo extends $cdk8s_Chart {
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const cdk8s = require("cdk8s");
class Foo extends (globalThis.$ClassFactory.resolveType("cdk8s.Chart") ?? cdk8s.Chart) {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
        $cdk8s_Chart: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("cdk8s.Chart") ?? cdk8s.Chart, "cdk8s", "Chart"))},
      })
    `;
  }
  get _liftMap() {
    return $stdlib.core.mergeLiftDeps(super._liftMap, {
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Foo };
//# sourceMappingURL=preflight.cjs.map
```

