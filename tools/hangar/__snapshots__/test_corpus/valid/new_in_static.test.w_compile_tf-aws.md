# [new_in_static.test.w](../../../../../examples/tests/valid/new_in_static.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $bucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $bucket.list()).length, 0), "bucket.list().length == 0");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.MyClass-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class MyClass {
    constructor({  }) {
    }
  }
  return MyClass;
}
//# sourceMappingURL=inflight.MyClass-1.js.map
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
      "Construct_Bucket_2C7B19D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Construct/Bucket/Default",
            "uniqueId": "Construct_Bucket_2C7B19D9"
          }
        },
        "bucket_prefix": "bucket-c8186214-",
        "force_destroy": false
      },
      "b1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/Default",
            "uniqueId": "b1"
          }
        },
        "bucket_prefix": "b1-c88fb896-",
        "force_destroy": false
      },
      "b2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b2/Default",
            "uniqueId": "b2"
          }
        },
        "bucket_prefix": "b2-c844cd88-",
        "force_destroy": false
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const c = require("constructs");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class MyClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static createBucket(scope) {
        return ($scope => $scope.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, $scope, "Bucket"))(scope);
      }
      static createMyClass(scope) {
        return new MyClass(scope, "MyClass");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyClass-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClassClient = ${MyClass._toInflightType()};
            const client = new MyClassClient({
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $bucket: ${$stdlib.core.liftObject(bucket)},
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
            [bucket, ["list"]],
          ],
          "$inflight_init": [
            [bucket, []],
          ],
        });
      }
    }
    const createBucket = (() => {
      this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b1");
    });
    if (true) {
      this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b2");
    }
    const scope = this.node.root.new("constructs.Construct", c.Construct, this, "Construct");
    const bucket = (MyClass.createBucket(scope));
    const bucket2 = (createBucket());
    const my = (MyClass.createMyClass(scope));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:play with bucket", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "new_in_static.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

