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
const Color =
  (function (tmp) {
    tmp[tmp["RED"] = 0] = ",RED";
    tmp[tmp["GREEN"] = 1] = ",GREEN";
    tmp[tmp["BLUE"] = 2] = ",BLUE";
    return tmp;
  })({})
;
class Util extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Util-1.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const UtilClient = ${Util._toInflightType()};
        const client = new UtilClient({
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
class Store extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    this.b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $__parent_this_1_b: ${$stdlib.core.liftObject(__parent_this_1.b)},
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
            [__parent_this_1.b, ["put"]],
          ],
          "$inflight_init": [
            [__parent_this_1.b, []],
          ],
        });
      }
    }
    const prefill = this.node.root.new("@winglang/sdk.cloud.OnDeploy", cloud.OnDeploy, this, "cloud.OnDeploy", new $Closure1(this, "$Closure1"));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Store-1.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const StoreClient = ${Store._toInflightType()};
        const client = new StoreClient({
          $this_b: ${$stdlib.core.liftObject(this.b)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "store": [
        [this.b, ["put"]],
      ],
      "$inflight_init": [
        [this.b, []],
      ],
    });
  }
}
module.exports = { Util, Store, Color };
//# sourceMappingURL=preflight.js.map
```

