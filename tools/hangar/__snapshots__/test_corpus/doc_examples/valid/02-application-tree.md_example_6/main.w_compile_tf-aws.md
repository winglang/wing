# [main.w](../../../../../../../examples/tests/doc_examples/valid/02-application-tree.md_example_6/main.w) | compile | tf-aws

## inflight.Factory-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Factory {
    constructor({  }) {
    }
  }
  return Factory;
}
//# sourceMappingURL=inflight.Factory-1.cjs.map
```

## inflight.MyBucket-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class MyBucket {
    constructor({  }) {
    }
  }
  return MyBucket;
}
//# sourceMappingURL=inflight.MyBucket-1.cjs.map
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
      "MyBucket_AD8CE4AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyBucket/Bucket/Default",
            "uniqueId": "MyBucket_AD8CE4AC"
          }
        },
        "bucket_prefix": "bucket-c8777765-",
        "force_destroy": false
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
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Factory extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static make($scope) {
        ($scope => $scope.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, $scope, "Bucket"))($scope);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Factory-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FactoryClient = ${Factory._toInflightType()};
            const client = new FactoryClient({
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
    class MyBucket extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (Factory.make(this));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyBucket-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyBucketClient = ${MyBucket._toInflightType()};
            const client = new MyBucketClient({
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
    new MyBucket(this, "MyBucket");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

