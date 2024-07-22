# [baz.w](../../../../../examples/tests/valid/baz.w) | compile | tf-aws

## inflight.Baz-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Baz {
    constructor({  }) {
    }
  }
  return Baz;
}
//# sourceMappingURL=inflight.Baz-1.cjs.map
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
class Baz extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static baz($scope) {
    return "baz";
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Baz-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const BazClient = ${Baz._toInflightType()};
        const client = new BazClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Baz };
//# sourceMappingURL=preflight.cjs.map
```

