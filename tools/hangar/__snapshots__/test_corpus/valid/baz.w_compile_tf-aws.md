# [baz.w](../../../../../examples/tests/valid/baz.w) | compile | tf-aws

## inflight.Baz-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class Baz {
    constructor({  }) {
    }
  }
  return Baz;
}
//# sourceMappingURL=./inflight.Baz-1.cjs.map
```

## preflight.cjs
```cjs
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Baz extends $stdlib.std.Resource {
    constructor($scope, $id, ) {
      super($scope, $id);
    }
    static baz() {
      return "baz";
    }
    static _toInflightType() {
      return `
        require("././inflight.Baz-1.cjs")({
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const BazClient = ${Baz._toInflightType(this)};
          const client = new BazClient({
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
  return { Baz };
};
//# sourceMappingURL=preflight.cjs.map
```

