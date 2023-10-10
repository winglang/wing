# [bring_wing_library.test.w](../../../../../examples/tests/valid/bring_wing_library.test.w) | compile | tf-aws

## inflight.Store-2.js
```js
module.exports = function({ $myutil_Util }) {
  class Store {
    constructor({ $this_data }) {
      this.$this_data = $this_data;
    }
    async set(message) {
      (await this.$this_data.put("data.txt",(await $myutil_Util.double(message))));
    }
  }
  return Store;
}

```

## inflight.Util-1.js
```js
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
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const FavoriteNumbers =
    (function (tmp) {
      tmp[tmp["SEVEN"] = 0] = "SEVEN";
      tmp[tmp["FORTY_TWO"] = 1] = "FORTY_TWO";
      return tmp;
    })({})
  ;
  return { FavoriteNumbers };
};

```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const fixture = require("./preflight.wingfixture-5.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    new fixture.Store(this,"fixture.Store");
    const fave_num = fixture.FavoriteNumbers.SEVEN;
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_wing_library.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

## preflight.store-3.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const cloud = $stdlib.cloud;
  const myutil = require("./preflight.util-2.js")({ $stdlib });
  class Store extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this.data = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    }
    static _toInflightType(context) {
      return `
        require("./inflight.Store-2.js")({
          $myutil_Util: ${context._lift($stdlib.core.toLiftableModuleType(myutil.Util, "", "Util"))},
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const StoreClient = ${Store._toInflightType(this)};
          const client = new StoreClient({
            $this_data: ${this._lift(this.data)},
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _getInflightOps() {
      return ["set", "$inflight_init"];
    }
    _registerBind(host, ops) {
      if (ops.includes("$inflight_init")) {
        Store._registerBindObject(this.data, host, []);
      }
      if (ops.includes("set")) {
        Store._registerBindObject($stdlib.core.toLiftableModuleType(myutil.Util, "", "Util"), host, ["double"]);
        Store._registerBindObject(this.data, host, ["put"]);
      }
      super._registerBind(host, ops);
    }
  }
  return { Store };
};

```

## preflight.subdir-4.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    ...require("./preflight.util-2.js")({ $stdlib }),
  };
};

```

## preflight.util-2.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Util extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
    }
    static _toInflightType(context) {
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
    _getInflightOps() {
      return ["double", "$inflight_init"];
    }
  }
  return { Util };
};

```

## preflight.wingfixture-5.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    subdir: require("./preflight.subdir-4.js")({ $stdlib }),
    ...require("./preflight.store-3.js")({ $stdlib }),
    ...require("./preflight.enums-1.js")({ $stdlib }),
  };
};

```

