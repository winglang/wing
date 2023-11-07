# [function_variadic_arguments.test.w](../../../../../examples/tests/valid/function_variadic_arguments.test.w) | compile | tf-aws

## inflight.A-1.js
```js
"use strict";
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}

```

## inflight.B-1.js
```js
"use strict";
module.exports = function({ $A }) {
  class B extends $A {
    constructor({  }) {
      super({  });
    }
  }
  return B;
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, msg) {
        super($scope, $id);
        this.message = msg;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
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
    class B extends A {
      constructor($scope, $id, msg) {
        super($scope, $id);
        this.message = msg;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.B-1.js")({
            $A: ${context._lift(A)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BClient = ${B._toInflightType(this)};
            const client = new BClient({
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
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "bucket1");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "bucket2");
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "bucket3");
    (bucket3.node.addDependency(bucket1, bucket2));
    const funcBucket = ((...buckets) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: buckets.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(buckets.length,2)))};
    });
    (funcBucket(bucket1, bucket2));
    const func1 = ((x, y, ...args) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: x == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: y == \"something\" || y == nil")})(((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,"something")) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,undefined))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: args.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(args.length,4)))};
      for (const i of args) {
        {((cond) => {if (!cond) throw new Error("assertion failed: i > 0 && i < 5")})(((i > 0) && (i < 5)))};
      }
      (args.push(10));
      {((cond) => {if (!cond) throw new Error("assertion failed: args.at(4) == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((args.at(4)),10)))};
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
    {((cond) => {if (!cond) throw new Error("assertion failed: addNums(1, 2, 3) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((addNums(1, 2, 3)),6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: addNums() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((addNums()),0)))};
    const arityFunc = ((n, b, ...events) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: events.at(-1) == \"d\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((events.at((-1))),"d")))};
    });
    (arityFunc(1, true, "a", "b", "c", "d"));
    const subTypeFunc = ((...events) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: events.at(0).message == \"this is A\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((events.at(0)).message,"this is A")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: events.at(1).message == \"this is B\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((events.at(1)).message,"this is B")))};
    });
    (subTypeFunc(new A(this, "A", "this is A"), new B(this, "B", "this is B")));
    const jsonCastingFunc = ((...events) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: events.at(0) == \"str\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((events.at(0)),"str")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: events.at(1) == \"json str\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((events.at(1)),"json str")))};
    });
    const jsonStr = "json str";
    (jsonCastingFunc("str", jsonStr));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "function_variadic_arguments.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

