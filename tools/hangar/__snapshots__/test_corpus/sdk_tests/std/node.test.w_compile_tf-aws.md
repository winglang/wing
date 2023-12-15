# [node.test.w](../../../../../../examples/tests/sdk_tests/std/node.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $store1, $store2 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $store1.put("hello", "world"));
      (await $expect_Util.equal((await $store2.get("hello")), "world"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.SingletonBucket-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class SingletonBucket {
    constructor({  }) {
    }
  }
  return SingletonBucket;
}
//# sourceMappingURL=./inflight.SingletonBucket-1.cjs.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "SingletonBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/SingletonBucket/Default",
            "uniqueId": "SingletonBucket"
          }
        },
        "bucket_prefix": "singletonbucket-c8ac9620-",
        "force_destroy": false
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_sqs_queue": {
      "q1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1/Default",
            "uniqueId": "q1"
          }
        },
        "message_retention_seconds": 3600,
        "name": "q1-c8d04b5e",
        "visibility_timeout_seconds": 30
      },
      "q2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2/Default",
            "uniqueId": "q2"
          }
        },
        "message_retention_seconds": 3600,
        "name": "q2-c8aa6380",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class SingletonBucket extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static of(scope) {
        const uid = "SingletonBucket";
        const root = (std.Node.of(scope)).root;
        const root_node = (std.Node.of(root));
        return ((root_node.tryFindChild(uid)) ?? ($scope => $scope.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, $scope, uid))(root));
      }
      static _toInflightType() {
        return `
          require("././inflight.SingletonBucket-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const SingletonBucketClient = ${SingletonBucket._toInflightType(this)};
            const client = new SingletonBucketClient({
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
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $store1: ${$stdlib.core.liftObject(store1)},
            $store2: ${$stdlib.core.liftObject(store2)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(store1, host, ["put"]);
          $Closure1._registerOnLiftObject(store2, host, ["get"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const app = (std.Node.of(bucket)).app;
    {((cond) => {if (!cond) throw new Error("assertion failed: app.workdir.endsWith(\".wing\")")})(app.workdir.endsWith(".wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: app.entrypointDir.endsWith(\"/sdk_tests/std\") || app.entrypointDir.endsWith(\"\\\\sdk_tests\\\\std\")")})((app.entrypointDir.endsWith("/sdk_tests/std") || app.entrypointDir.endsWith("\\sdk_tests\\std")))};
    app.isTestEnvironment;
    const q1 = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "q1");
    const q2 = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "q2");
    const store1 = (SingletonBucket.of(q1));
    const store2 = (SingletonBucket.of(q2));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:singleton", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "node.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

