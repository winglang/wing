# [statements_before_super.w](../../../../../examples/tests/valid/statements_before_super.w) | compile | tf-aws

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
```

## inflight.B-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $A }) {
  class B extends $A {
    constructor({  }) {
      super({  });
    }
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.cjs.map
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
class A extends $stdlib.std.Resource {
  constructor($scope, $id, a) {
    super($scope, $id);
    this.a = a;
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const AClient = ${A._toInflightType()};
        const client = new AClient({
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
class B extends A {
  constructor($scope, $id, ) {
    const x = (3 + 5);
    super($scope, $id, x);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.B-1.cjs")({
        $A: ${$stdlib.core.liftObject(A)},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const BClient = ${B._toInflightType()};
        const client = new BClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return $stdlib.core.mergeLiftDeps(super._liftMap, {
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap,  };
//# sourceMappingURL=preflight.cjs.map
```

