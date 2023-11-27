# [bring_wing_library.test.w](../../../../../examples/tests/valid/bring_wing_library.test.w) | compile | tf-aws

## inflight.$Closure1-3.js
```js
"use strict";
module.exports = function({ $fixture_Store }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: fixture.Store.makeKeyInflight(\"hello\") == \"data/hello.json\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fixture_Store.makeKeyInflight("hello")),"data/hello.json")))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-3.js.map
```

## inflight.Store-2.js
```js
"use strict";
module.exports = function({ $myutil_Util }) {
  class Store {
    constructor({ $this_data }) {
      this.$this_data = $this_data;
    }
    static async makeKeyInflight(name) {
      return (require("<ABSOLUTE_PATH>/util.js")["makeKeyInflight"])(name)
    }
    async set(message) {
      (await this.$this_data.put("data.txt", (await $myutil_Util.double(message))));
    }
  }
  return Store;
}
//# sourceMappingURL=inflight.Store-2.js.map
```

## inflight.Util-1.js
```js
"use strict";
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
    static async double(msg) {
      return String.raw({ raw: ["", "", ""] }, msg, msg);
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-1.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "fixtureStore_cloudBucket_0EE75A93": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fixture.Store/cloud.Bucket/Default",
            "uniqueId": "fixtureStore_cloudBucket_0EE75A93"
          }
        },
        "bucket_prefix": "cloud-bucket-c8afb3a9-",
        "force_destroy": false
      }
    }
  }
}
```

## preflight.enums-1.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const FavoriteNumbers =
    (function (tmp) {
      tmp[tmp["SEVEN"] = 0] = ",SEVEN";
      tmp[tmp["FORTY_TWO"] = 1] = ",FORTY_TWO";
      return tmp;
    })({})
  ;
  return { FavoriteNumbers };
};
//# sourceMappingURL=preflight.enums-1.js.map
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const fixture = require("./preflight.testfixture-5.js")({ $stdlib });
const testfixture = require("./preflight.testfixture-5.js")({ $stdlib });
const testfixture2 = require("./preflight.testfixture-5.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-3.js")({
            $fixture_Store: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fixture.Store, "", "Store"))},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject($stdlib.core.toLiftableModuleType(fixture.Store, "", "Store"), host, ["makeKeyInflight"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    new fixture.Store(this, "fixture.Store");
    const fave_num = fixture.FavoriteNumbers.SEVEN;
    const fave_num2 = testfixture.FavoriteNumbers.SEVEN;
    const fave_num3 = testfixture2.FavoriteNumbers.SEVEN;
    {((cond) => {if (!cond) throw new Error("assertion failed: fixture.Store.makeKey(\"hello\") == \"data/hello.json\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fixture.Store.makeKey("hello")),"data/hello.json")))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:makeKeyInflight", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_wing_library.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

## preflight.store-3.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const cloud = $stdlib.cloud;
  const myutil = require("./preflight.util-2.js")({ $stdlib });
  class Store extends $stdlib.std.Resource {
    constructor($scope, $id, ) {
      super($scope, $id);
      this.data = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    }
    static makeKey(name) {
      return (require("<ABSOLUTE_PATH>/util.js")["makeKey"])(name)
    }
    static _toInflightType() {
      return `
        require("./inflight.Store-2.js")({
          $myutil_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(myutil.Util, "", "Util"))},
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const StoreClient = ${Store._toInflightType(this)};
          const client = new StoreClient({
            $this_data: ${$stdlib.core.liftObject(this.data)},
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _supportedOps() {
      return ["makeKeyInflight", "set", "$inflight_init"];
    }
    _registerOnLift(host, ops) {
      if (ops.includes("$inflight_init")) {
        Store._registerOnLiftObject(this.data, host, []);
      }
      if (ops.includes("set")) {
        Store._registerOnLiftObject($stdlib.core.toLiftableModuleType(myutil.Util, "", "Util"), host, ["double"]);
        Store._registerOnLiftObject(this.data, host, ["put"]);
      }
      super._registerOnLift(host, ops);
    }
  }
  return { Store };
};
//# sourceMappingURL=preflight.store-3.js.map
```

## preflight.subdir-4.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    ...require("./preflight.util-2.js")({ $stdlib }),
  };
};
//# sourceMappingURL=preflight.subdir-4.js.map
```

## preflight.testfixture-5.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    subdir: require("./preflight.subdir-4.js")({ $stdlib }),
    ...require("./preflight.store-3.js")({ $stdlib }),
    ...require("./preflight.enums-1.js")({ $stdlib }),
  };
};
//# sourceMappingURL=preflight.testfixture-5.js.map
```

## preflight.util-2.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
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
      return ["double", "$inflight_init"];
    }
  }
  return { Util };
};
//# sourceMappingURL=preflight.util-2.js.map
```

