# [new_in_static.test.w](../../../../../examples/tests/valid/new_in_static.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $bucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: bucket.list().length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $bucket.list()).length,0)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.MyClass-1.js
```js
"use strict";
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
      },
      "cConstruct_cloudBucket_63D47E7B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c.Construct/cloud.Bucket/Default",
            "uniqueId": "cConstruct_cloudBucket_63D47E7B"
          }
        },
        "bucket_prefix": "cloud-bucket-c8e0ff1c-",
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
        return ($scope => $scope.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, $scope, "cloud.Bucket"))(scope);
      }
      static createMyClass(scope) {
        return new MyClass(scope, "MyClass");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.MyClass-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClassClient = ${MyClass._toInflightType(this)};
            const client = new MyClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $bucket: ${context._lift(bucket)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(bucket, host, ["list"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const createBucket = (() => {
      this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b1");
    });
    if (true) {
      this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b2");
    }
    const scope = this.node.root.new("constructs.Construct", c.Construct, this, "c.Construct");
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

