# [function_variadic_arguments.test.w](../../../../../examples/tests/valid/function_variadic_arguments.test.w) | compile | tf-aws

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class A {
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
```

## inflight.B-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $A }) {
  class B extends $A {
  }
  return B;
}
//# sourceMappingURL=inflight.B-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, msg) {
        super($scope, $id);
        this.message = msg;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
          })
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
        super($scope, $id, msg);
        this.message = msg;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.B-1.cjs")({
            $A: ${$stdlib.core.liftObject(A)},
          })
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    const bucket1 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket1");
    const bucket2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket2");
    const bucket3 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket3");
    ($helpers.nodeof(bucket3).addDependency(bucket1, bucket2));
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
      $macros.__MutArray_push(false, args, 10);
      $helpers.assert($helpers.eq($macros.__MutArray_at(false, args, 4), 10), "args.at(4) == 10");
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
        $macros.__Array_at(false, events, (-1));
      }
      catch ($error_ex) {
        const ex = $error_ex.message;
        error = true;
      }
      $helpers.assert(error, "error");
    });
    (arityFunc(1, true, "a", "b", "c", "d"));
    const subTypeFunc = ((...events) => {
      $helpers.assert($helpers.eq($macros.__Array_at(false, events, 0).message, "this is A"), "events.at(0).message == \"this is A\"");
      $helpers.assert($helpers.eq($macros.__Array_at(false, events, 1).message, "this is B"), "events.at(1).message == \"this is B\"");
    });
    (subTypeFunc(new A(this, "A", "this is A"), new B(this, "B", "this is B")));
    const jsonCastingFunc = ((...events) => {
      $helpers.assert($helpers.eq($macros.__Array_at(false, events, 0), "str"), "events.at(0) == \"str\"");
      $helpers.assert($helpers.eq($macros.__Array_at(false, events, 1), "json str"), "events.at(1) == \"json str\"");
    });
    const jsonStr = "json str";
    (jsonCastingFunc("str", jsonStr));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "function_variadic_arguments.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

