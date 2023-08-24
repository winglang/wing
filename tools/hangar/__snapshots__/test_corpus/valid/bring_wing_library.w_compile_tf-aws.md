# [bring_wing_library.w](../../../../../examples/tests/valid/bring_wing_library.w) | compile | tf-aws

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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
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
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "fixtureStore_cloudBucket_Encryption_6A8FAEBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/fixture.Store/cloud.Bucket/Encryption",
            "uniqueId": "fixtureStore_cloudBucket_Encryption_6A8FAEBA"
          }
        },
        "bucket": "${aws_s3_bucket.fixtureStore_cloudBucket_0EE75A93.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const fixture = require("./preflight.lib-2.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    new fixture.Store(this,"fixture.Store");
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_wing_library", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

## preflight.lib-2.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const cloud = $stdlib.cloud;
  const myutil = require("./preflight.util-1.js")({ $stdlib });
  class Store extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this._addInflightOps("set", "$inflight_init");
      this.data = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    }
    static _toInflightType(context) {
      return $stdlib.core.NodeJsCode.fromInline(`
        require("./inflight.Store-2.js")({
          $myutil_Util: ${context._lift(myutil.Util)},
        })
      `);
    }
    _toInflight() {
      return $stdlib.core.NodeJsCode.fromInline(`
        (await (async () => {
          const StoreClient = ${Store._toInflightType(this).text};
          const client = new StoreClient({
            $this_data: ${this._lift(this.data)},
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `);
    }
    _registerBind(host, ops) {
      if (ops.includes("$inflight_init")) {
        Store._registerBindObject(this.data, host, []);
      }
      if (ops.includes("set")) {
        Store._registerBindObject(myutil.Util, host, ["double"]);
        Store._registerBindObject(this.data, host, ["put"]);
      }
      super._registerBind(host, ops);
    }
  }
  return { Store };
};

```

## preflight.util-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Util extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this._addInflightOps("double", "$inflight_init");
    }
    static _toInflightType(context) {
      return $stdlib.core.NodeJsCode.fromInline(`
        require("./inflight.Util-1.js")({
        })
      `);
    }
    _toInflight() {
      return $stdlib.core.NodeJsCode.fromInline(`
        (await (async () => {
          const UtilClient = ${Util._toInflightType(this).text};
          const client = new UtilClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `);
    }
  }
  return { Util };
};

```

