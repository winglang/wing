# [function_variadic_arguments.test.w](../../../../../examples/tests/valid/function_variadic_arguments.test.w) | compile | tf-aws

## inflight.A-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.js.map
```

## inflight.B-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $A }) {
  class B extends $A {
    constructor({  }) {
      super({  });
    }
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.js.map
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
      "bucket1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/Default",
            "uniqueId": "bucket1"
          }
        },
        "bucket_prefix": "bucket1-c81ed215-",
        "force_destroy": false
      },
      "bucket2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/Default",
            "uniqueId": "bucket2"
          }
        },
        "bucket_prefix": "bucket2-c83a0be6-",
        "force_destroy": false
      },
      "bucket3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/Default",
            "uniqueId": "bucket3"
          }
        },
        "bucket_prefix": "bucket3-c8b6c706-",
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
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, msg) {
        super($scope, $id);
        this.message = msg;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType()};
            const client = new AClient({
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
    class B extends A {
      constructor($scope, $id, msg) {
        super($scope, $id);
        this.message = msg;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.B-1.js")({
            $A: ${$stdlib.core.liftObject(A)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BClient = ${B._toInflightType()};
            const client = new BClient({
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
    const bucket1 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket1");
    const bucket2 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket2");
    const bucket3 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket3");
    (bucket3.node.addDependency(bucket1, bucket2));
    const funcBucket = ((...buckets) => {
      $helpers.assert($helpers.eq(buckets.length, 2), "buckets.length == 2");
    });
    (funcBucket(bucket1, bucket2));
    const func1 = ((x, y, ...args) => {
      $helpers.assert($helpers.eq(x, 1), "x == 1");
      $helpers.assert(($helpers.eq(y, "something") || $helpers.eq(y, undefined)), "y == \"something\" || y == nil");
      $helpers.assert($helpers.eq(args.length, 4), "args.length == 4");
      for (const i of args) {
        $helpers.assert(((i > 0) && (i < 5)), "i > 0 && i < 5");
      }
      args.push(10);
      $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(args, 4), 10), "args.at(4) == 10");
    });
    (func1(1, "something", 1, 2, 3, 4));
    (func1(1, undefined, 1, 2, 3, 4));
    const addNums = ((...nums) => {
      let total = 0;
      for (const n of nums) {
        total = (total + n);
      }
      return total;
    });
    $helpers.assert($helpers.eq((addNums(1, 2, 3)), 6), "addNums(1, 2, 3) == 6");
    $helpers.assert($helpers.eq((addNums()), 0), "addNums() == 0");
    const arityFunc = ((n, b, ...events) => {
      let error = false;
      try {
        ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(events, (-1));
      }
      catch ($error_ex) {
        const ex = $error_ex.message;
        error = true;
      }
      $helpers.assert(error, "error");
    });
    (arityFunc(1, true, "a", "b", "c", "d"));
    const subTypeFunc = ((...events) => {
      $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(events, 0).message, "this is A"), "events.at(0).message == \"this is A\"");
      $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(events, 1).message, "this is B"), "events.at(1).message == \"this is B\"");
    });
    (subTypeFunc(new A(this, "A", "this is A"), new B(this, "B", "this is B")));
    const jsonCastingFunc = ((...events) => {
      $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(events, 0), "str"), "events.at(0) == \"str\"");
      $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(events, 1), "json str"), "events.at(1) == \"json str\"");
    });
    const jsonStr = "json str";
    (jsonCastingFunc("str", jsonStr));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "function_variadic_arguments.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

