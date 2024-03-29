# [bring_local.test.w](../../../../../examples/tests/valid/bring_local.test.w) | compile | tf-aws

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

## inflight.$Closure1-3.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $store }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $store.store("foo"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-3.js.map
```

## inflight.Q-2.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Q {
    constructor({  }) {
    }
    static async greet(name) {
      return (require("../../../subdir/util.ts")["greet"])(name)
    }
  }
  return Q;
}
//# sourceMappingURL=inflight.Q-2.js.map
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

## inflight.Triangle-3.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Triangle {
    constructor({  }) {
    }
  }
  return Triangle;
}
//# sourceMappingURL=inflight.Triangle-3.js.map
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

## inflight.Util-3.js
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
//# sourceMappingURL=inflight.Util-3.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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

## preflight.empty-1.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const { $APP } = initializePlatform();
module.exports = {  };
//# sourceMappingURL=preflight.empty-1.js.map
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const file1 = require("./preflight.store-2.js");
const file2 = require("./preflight.subfile-3.js");
const file3 = require("./preflight.empty-1.js");
const math = $stdlib.math;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-3.js")({
            $store: ${$stdlib.core.liftObject(store)},
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
            [store, ["store"]],
          ],
          "$inflight_init": [
            [store, []],
          ],
        });
      }
    }
    class Triangle extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      area() {
        return 1;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Triangle-3.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const TriangleClient = ${Triangle._toInflightType()};
            const client = new TriangleClient({
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
    class Util extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Util-3.js")({
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
    const store = new file1.Store(this, "Store");
    const q = new file2.Q(this, "Q");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:add data to store", new $Closure1(this, "$Closure1"));
    const s = ({"x": 1, "y": 2});
    const c = file1.Color.BLUE;
    $helpers.assert($helpers.neq(c, file1.Color.RED), "c != file1.Color.RED");
    const t = new Triangle(this, "Triangle");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

## preflight.store-2.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const file3 = require("./preflight.empty-1.js");
const math = $stdlib.math;
const cloud = $stdlib.cloud;
const { $APP } = initializePlatform();
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
    this.b = $APP.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
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
    const prefill = $APP.node.root.new("@winglang/sdk.cloud.OnDeploy", cloud.OnDeploy, this, "OnDeploy", new $Closure1(this, "$Closure1"));
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
//# sourceMappingURL=preflight.store-2.js.map
```

## preflight.subfile-3.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const math = $stdlib.math;
const { $APP } = initializePlatform();
class Q extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Q-2.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const QClient = ${Q._toInflightType()};
        const client = new QClient({
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
  static get _liftTypeMap() {
    return ({
      "greet": [
      ],
    });
  }
}
module.exports = { Q };
//# sourceMappingURL=preflight.subfile-3.js.map
```

