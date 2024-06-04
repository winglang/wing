# [main.w](../../../../../../../examples/tests/doc_examples/valid/02-application-tree.md_example_2/main.w) | compile | tf-aws

## inflight.Group1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Group1 {
    constructor({  }) {
    }
  }
  return Group1;
}
//# sourceMappingURL=inflight.Group1-1.cjs.map
```

## inflight.Group2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Group2 {
    constructor({  }) {
    }
  }
  return Group2;
}
//# sourceMappingURL=inflight.Group2-1.cjs.map
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
      "Group1_Store_84E51926": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Group1/Store/Default",
            "uniqueId": "Group1_Store_84E51926"
          }
        },
        "bucket_prefix": "store-c8728b24-",
        "force_destroy": false
      },
      "Group2_Store_4BF98593": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Group2/Store/Default",
            "uniqueId": "Group2_Store_4BF98593"
          }
        },
        "bucket_prefix": "store-c85f4cba-",
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
    class Group1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Store");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Group1-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const Group1Client = ${Group1._toInflightType()};
            const client = new Group1Client({
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
    class Group2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Store");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Group2-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const Group2Client = ${Group2._toInflightType()};
            const client = new Group2Client({
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
    new Group1(this, "Group1");
    new Group2(this, "Group2");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

