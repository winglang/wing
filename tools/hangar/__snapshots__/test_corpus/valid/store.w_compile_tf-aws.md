# [store.w](../../../../../tests/valid/store.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $__parent_this_1_b }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Store-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Store {
    constructor($args) {
      const { $this_b } = $args;
      this.$this_b = $this_b;
    }
    async store(data) {
      (await this.$this_b.put("data.txt", data));
    }
  }
  return Store;
}
//# sourceMappingURL=inflight.Store-1.cjs.map
```

## inflight.Util-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Util {
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-1.cjs.map
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
const file3 = $helpers.bringJs(`${__dirname}/preflight.empty-1.cjs`, $preflightTypesMap);
const math = $stdlib.math;
const cloud = $stdlib.cloud;
const Color =
  (function (tmp) {
    tmp["RED"] = "RED";
    tmp["GREEN"] = "GREEN";
    tmp["BLUE"] = "BLUE";
    return tmp;
  })({})
;
class Util extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Util-1.cjs")({
      })
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
    this.b = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $__parent_this_1_b: ${$stdlib.core.liftObject(__parent_this_1.b)},
          })
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
    const prefill = globalThis.$ClassFactory.new("@winglang/sdk.cloud.OnDeploy", cloud.OnDeploy, this, "OnDeploy", new $Closure1(this, "$Closure1"));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Store-1.cjs")({
      })
    `;
  }
  _liftedState() {
    return {
      ...(super._liftedState?.() ?? {}),
      $this_b: $stdlib.core.liftObject(this.b),
    };
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
module.exports = { $preflightTypesMap, Util, Store, Color };
//# sourceMappingURL=preflight.cjs.map
```

## preflight.empty-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
let $preflightTypesMap = {};
module.exports = { $preflightTypesMap,  };
//# sourceMappingURL=preflight.empty-1.cjs.map
```

