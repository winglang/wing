# [lift_via_closure.test.w](../../../../../examples/tests/valid/lift_via_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $bucket2 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $bucket2.put("hello", "world"));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $fn }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $bucket2, $fn2, $fn2_bucket }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn2());
      {((cond) => {if (!cond) throw new Error("assertion failed: fn2.bucket.get(\"hello\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fn2_bucket.get("hello")),"world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fn2.listFiles().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fn2.listFiles()).length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bucket2.get(\"b2\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $bucket2.get("b2")),"world")))};
    }
  }
  return $Closure3;
}

```

## inflight.MyClosure-1.js
```js
"use strict";
module.exports = function({ $bucket2 }) {
  class MyClosure {
    constructor({ $this_bucket }) {
      this.$this_bucket = $this_bucket;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("handle called")};
      (await this.putFile());
    }
    async putFile() {
      {console.log("putFile called")};
      (await this.$this_bucket.put("hello", "world"));
    }
    async listFiles() {
      (await $bucket2.put("b2", "world"));
      return (await this.$this_bucket.list());
    }
  }
  return MyClosure;
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
      "MyClosure_cloudBucket_4DAD12C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyClosure/cloud.Bucket/Default",
            "uniqueId": "MyClosure_cloudBucket_4DAD12C0"
          }
        },
        "bucket_prefix": "cloud-bucket-c8b87a6b-",
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $bucket2: ${context._lift(bucket2)},
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
          $Closure1._registerOnLiftObject(bucket2, host, ["put"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class MyClosure extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.MyClosure-1.js")({
            $bucket2: ${context._lift(bucket2)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClosureClient = ${MyClosure._toInflightType(this)};
            const client = new MyClosureClient({
              $this_bucket: ${this._lift(this.bucket)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "putFile", "listFiles", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyClosure._registerOnLiftObject(this.bucket, host, []);
        }
        if (ops.includes("handle")) {
          MyClosure._registerOnLiftObject(this, host, ["putFile"]);
        }
        if (ops.includes("listFiles")) {
          MyClosure._registerOnLiftObject(bucket2, host, ["put"]);
          MyClosure._registerOnLiftObject(this.bucket, host, ["list"]);
        }
        if (ops.includes("putFile")) {
          MyClosure._registerOnLiftObject(this.bucket, host, ["put"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $fn: ${context._lift(fn)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
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
          $Closure2._registerOnLiftObject(fn, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $bucket2: ${context._lift(bucket2)},
            $fn2: ${context._lift(fn2)},
            $fn2_bucket: ${context._lift(fn2.bucket)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
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
          $Closure3._registerOnLiftObject(bucket2, host, ["get"]);
          $Closure3._registerOnLiftObject(fn2, host, ["handle", "listFiles"]);
          $Closure3._registerOnLiftObject(fn2.bucket, host, ["get"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
    const fn = new $Closure1(this, "$Closure1");
    const fn2 = new MyClosure(this, "MyClosure");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:call synthetic closure class as a function", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:call non-synthetic closure as a function", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_via_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

