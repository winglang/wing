# [bring_wing_library.test.w](../../../../../examples/tests/valid/bring_wing_library.test.w) | compile | tf-aws

## inflight.$Closure1-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $fixture_Store }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $fixture_Store.makeKeyInflight("hello")), "data/hello.json"), "fixture.Store.makeKeyInflight(\"hello\") == \"data/hello.json\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-3.cjs.map
```

## inflight.Store-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $myutil_Util }) {
  class Store {
    constructor({ $this_data, $this_handlers }) {
      this.$this_data = $this_data;
      this.$this_handlers = $this_handlers;
    }
    static async makeKeyInflight(name) {
      return (require("@winglibs/testfixture/util.js")["makeKeyInflight"])(name)
    }
    async set(message) {
      (await this.$this_data.put("data.txt", (await $myutil_Util.double(message))));
      for (const handler of this.$this_handlers) {
        (await handler(message));
      }
    }
  }
  return Store;
}
//# sourceMappingURL=inflight.Store-2.cjs.map
```

## inflight.Util-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
    static async makeKeyInflight(name) {
      return (require("@winglibs/testfixture/util.js")["makeKeyInflight"])(name)
    }
    static async double(msg) {
      return String.raw({ raw: ["", "", ""] }, msg, msg);
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-1.cjs.map
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
  },
  "resource": {
    "aws_s3_bucket": {
      "Store_Bucket_42A4CEFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/Bucket/Default",
            "uniqueId": "Store_Bucket_42A4CEFB"
          }
        },
        "bucket_prefix": "bucket-c843dbb0-",
        "force_destroy": false
      }
    }
  }
}
```

<<<<<<< HEAD
## preflight.enums-1.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const FavoriteNumbers =
  (function (tmp) {
    tmp["SEVEN"] = "SEVEN";
    tmp["FORTY_TWO"] = "FORTY_TWO";
    return tmp;
  })({})
;
module.exports = { FavoriteNumbers };
//# sourceMappingURL=preflight.enums-1.js.map
```

## preflight.js
```js
=======
## preflight.cjs
```cjs
>>>>>>> f0e2479d64ee2fc807ed12331edf77cd3d30276a
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
<<<<<<< HEAD
const $extern = $helpers.createExternRequire(__dirname);
const fixture = require("./preflight.testfixture-5.js");
const testfixture = require("./preflight.testfixture-5.js");
const testfixture2 = require("./preflight.testfixture-5.js");
=======
const fixture = require("./preflight.testfixture-5.cjs");
const testfixture = require("./preflight.testfixture-5.cjs");
const testfixture2 = require("./preflight.testfixture-5.cjs");
>>>>>>> f0e2479d64ee2fc807ed12331edf77cd3d30276a
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-3.cjs")({
            $fixture_Store: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fixture.Store, "", "Store"))},
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
            [$stdlib.core.toLiftableModuleType(fixture.Store, "", "Store"), ["makeKeyInflight"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(fixture.Store, "", "Store"), []],
          ],
        });
      }
    }
    new fixture.Store(this, "Store");
    const fave_num = fixture.FavoriteNumbers.SEVEN;
    const fave_num2 = testfixture.FavoriteNumbers.SEVEN;
    const fave_num3 = testfixture2.FavoriteNumbers.SEVEN;
    $helpers.assert($helpers.eq((fixture.Store.makeKey("hello")), "data/hello.json"), "fixture.Store.makeKey(\"hello\") == \"data/hello.json\"");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:makeKeyInflight", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_wing_library.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.enums-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const FavoriteNumbers =
  (function (tmp) {
    tmp["SEVEN"] = "SEVEN";
    tmp["FORTY_TWO"] = "FORTY_TWO";
    return tmp;
  })({})
;
module.exports = { FavoriteNumbers };
//# sourceMappingURL=preflight.enums-1.cjs.map
```

## preflight.store-3.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const myutil = require("./preflight.util-2.cjs");
class Store extends $stdlib.std.Resource {
  constructor($scope, $id, options) {
    super($scope, $id);
    this.data = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    this.handlers = [];
  }
  static makeKey(name) {
    return ($extern("@winglibs/testfixture/util.js")["makeKey"])(name)
  }
  onSet(handler) {
    this.handlers.push(handler);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Store-2.cjs")({
        $myutil_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(myutil.Util, "", "Util"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const StoreClient = ${Store._toInflightType()};
        const client = new StoreClient({
          $this_data: ${$stdlib.core.liftObject(this.data)},
          $this_handlers: ${$stdlib.core.liftObject(this.handlers)},
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "set": [
        [$stdlib.core.toLiftableModuleType(myutil.Util, "", "Util"), ["double"]],
        [this.data, ["put"]],
        [this.handlers, []],
      ],
      "$inflight_init": [
        [$stdlib.core.toLiftableModuleType(myutil.Util, "", "Util"), []],
        [this.data, []],
        [this.handlers, []],
      ],
    });
  }
  static get _liftTypeMap() {
    return ({
      "makeKeyInflight": [
      ],
    });
  }
}
module.exports = { Store };
//# sourceMappingURL=preflight.store-3.cjs.map
```

## preflight.subdir-4.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
module.exports = {
  ...require("./preflight.util-2.cjs"),
};
//# sourceMappingURL=preflight.subdir-4.cjs.map
```

## preflight.testfixture-5.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
module.exports = {
  get subdir() { return require("./preflight.subdir-4.cjs") },
  ...require("./preflight.store-3.cjs"),
  ...require("./preflight.enums-1.cjs"),
};
//# sourceMappingURL=preflight.testfixture-5.cjs.map
```

## preflight.util-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
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
  static get _liftTypeMap() {
    return ({
      "makeKeyInflight": [
      ],
      "double": [
      ],
    });
  }
}
module.exports = { Util };
//# sourceMappingURL=preflight.util-2.cjs.map
```

