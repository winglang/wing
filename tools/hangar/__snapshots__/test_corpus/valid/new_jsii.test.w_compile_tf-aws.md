# [new_jsii.test.w](../../../../../examples/tests/valid/new_jsii.test.w) | compile | tf-aws

## inflight.CustomScope-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class CustomScope {
    constructor({  }) {
    }
  }
  return CustomScope;
}
//# sourceMappingURL=inflight.CustomScope-1.cjs.map
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
      "CustomScope_Bucket_8BBB89A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/CustomScope/Bucket/Default",
            "uniqueId": "CustomScope_Bucket_8BBB89A4"
          }
        },
        "bucket_prefix": "bucket-c830af09-",
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
    class CustomScope extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        count += 1;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.CustomScope-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const CustomScopeClient = ${CustomScope._toInflightType()};
            const client = new CustomScopeClient({
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
    let count = 0;
    ($scope => $scope.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, $scope, "Bucket"))(new CustomScope(this, "CustomScope"));
    $helpers.assert($helpers.eq(count, 1), "count == 1");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "new_jsii.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

