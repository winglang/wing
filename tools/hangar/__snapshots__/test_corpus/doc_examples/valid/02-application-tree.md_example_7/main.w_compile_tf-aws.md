# [main.w](../../../../../../../examples/tests/doc_examples/valid/02-application-tree.md_example_7/main.w) | compile | tf-aws

## inflight.Base-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Base {
    constructor({  }) {
    }
  }
  return Base;
}
//# sourceMappingURL=inflight.Base-1.cjs.map
```

## inflight.Derived-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Base }) {
  class Derived extends $Base {
    constructor({  }) {
      super({  });
    }
  }
  return Derived;
}
//# sourceMappingURL=inflight.Derived-1.cjs.map
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
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
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
    class Base extends $stdlib.std.Resource {
      constructor($scope, $id, b) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Base-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BaseClient = ${Base._toInflightType()};
            const client = new BaseClient({
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
    class Derived extends Base {
      constructor($scope, $id, ) {
        super($scope, $id, ($scope => $scope.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, $scope, "Bucket"))($scope));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Derived-1.cjs")({
            $Base: ${$stdlib.core.liftObject(Base)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DerivedClient = ${Derived._toInflightType()};
            const client = new DerivedClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    new Derived(this, "Derived");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

