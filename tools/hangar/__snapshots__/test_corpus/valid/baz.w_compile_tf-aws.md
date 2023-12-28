# [baz.w](../../../../../examples/tests/valid/baz.w) | compile | tf-aws

## inflight.Baz-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Baz {
    constructor({  }) {
    }
  }
  return Baz;
}
//# sourceMappingURL=inflight.Baz-1.js.map
```

## preflight.js
```js
"use strict";
<<<<<<< HEAD
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
class Baz extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
=======
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const $helpers = $stdlib.helpers;
  class Baz extends $stdlib.std.Resource {
    constructor($scope, $id, ) {
      super($scope, $id);
    }
    static baz() {
      return "baz";
    }
    static _toInflightType() {
      return `
        require("./inflight.Baz-1.js")({
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
>>>>>>> 339fec8a7671f8c4f0ff69adea9e14815616e8dd
  }
  static baz() {
    return "baz";
  }
  static _toInflightType() {
    return `
      require("./inflight.Baz-1.js")({
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
module.exports = { Baz };
//# sourceMappingURL=preflight.js.map
```

