# [store.w](../../../../../examples/tests/valid/store.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_1_b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_1_b.put("data.txt", "<empty>"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.Store-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Store {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async store(data) {
      (await this.$this_b.put("data.txt", data));
    }
  }
  return Store;
}
//# sourceMappingURL=inflight.Store-1.js.map
```

## inflight.Util-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-1.js.map
```

## preflight.empty-1.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
module.exports = {  };
//# sourceMappingURL=preflight.empty-1.js.map
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const file3 = require("./preflight.empty-1.js");
const math = $stdlib.math;
const cloud = $stdlib.cloud;
class Util extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("./inflight.Util-1.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const UtilClient = ${Util._toInflightType(this)};
        const client = new UtilClient({
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
class Store extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    this.b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $__parent_this_1_b: ${$stdlib.core.liftObject(__parent_this_1.b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "handle": [
            [__parent_this_1.b, ["put"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    const prefill = this.node.root.new("@winglang/sdk.cloud.OnDeploy", cloud.OnDeploy, this, "cloud.OnDeploy", new $Closure1(this, "$Closure1"));
  }
  static _toInflightType() {
    return `
      require("./inflight.Store-1.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const StoreClient = ${Store._toInflightType(this)};
        const client = new StoreClient({
          $this_b: ${$stdlib.core.liftObject(this.b)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  _supportedOps() {
    return [...super._supportedOps(), "store", "$inflight_init"];
  }
  onLift(host, ops) {
    $stdlib.core.onLiftMatrix(host, ops, {
      "$inflight_init": [
        [this.b, []],
      ],
      "store": [
        [this.b, ["put"]],
      ],
    });
    super.onLift(host, ops);
  }
}
const Color =
  (function (tmp) {
    tmp[tmp["RED"] = 0] = ",RED";
    tmp[tmp["GREEN"] = 1] = ",GREEN";
    tmp[tmp["BLUE"] = 2] = ",BLUE";
    return tmp;
  })({})
;
module.exports = { Util, Store, Color };
//# sourceMappingURL=preflight.js.map
```

