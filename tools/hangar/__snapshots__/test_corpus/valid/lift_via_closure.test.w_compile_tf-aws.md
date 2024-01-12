# [lift_via_closure.test.w](../../../../../examples/tests/valid/lift_via_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $bucket2, $fn2, $fn2_bucket }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn2());
      $helpers.assert($helpers.eq((await $fn2_bucket.get("hello")), "world"), "fn2.bucket.get(\"hello\") == \"world\"");
      $helpers.assert($helpers.eq((await $fn2.listFiles()).length, 1), "fn2.listFiles().length == 1");
      $helpers.assert($helpers.eq((await $bucket2.get("b2")), "world"), "bucket2.get(\"b2\") == \"world\"");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.MyClosure-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $bucket2 }) {
  class MyClosure {
    constructor({ $this_bucket }) {
      this.$this_bucket = $this_bucket;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      console.log("handle called");
      (await this.putFile());
    }
    async putFile() {
      console.log("putFile called");
      (await this.$this_bucket.put("hello", "world"));
    }
    async listFiles() {
      (await $bucket2.put("b2", "world"));
      return (await this.$this_bucket.list());
    }
  }
  return MyClosure;
}
//# sourceMappingURL=inflight.MyClosure-1.js.map
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
    "outputs": {}
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $Closure1._onLiftMatrix(host, ops, {
          "handle": [
            [bucket2, ["put"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class MyClosure extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        this.bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
      }
      static _toInflightType() {
        return `
          require("./inflight.MyClosure-1.js")({
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClosureClient = ${MyClosure._toInflightType(this)};
            const client = new MyClosureClient({
              $this_bucket: ${$stdlib.core.liftObject(this.bucket)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "putFile", "listFiles", "$inflight_init"];
      }
      onLift(host, ops) {
        MyClosure._onLiftMatrix(host, ops, {
          "$inflight_init": [
            [this.bucket, []],
          ],
          "handle": [
          ],
          "listFiles": [
            [bucket2, ["put"]],
            [this.bucket, ["list"]],
          ],
          "putFile": [
            [this.bucket, ["put"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure2-1.js")({
            $fn: ${$stdlib.core.liftObject(fn)},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $Closure2._onLiftMatrix(host, ops, {
          "handle": [
            [fn, ["handle"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure3-1.js")({
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
            $fn2: ${$stdlib.core.liftObject(fn2)},
            $fn2_bucket: ${$stdlib.core.liftObject(fn2.bucket)},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $Closure3._onLiftMatrix(host, ops, {
          "handle": [
            [bucket2, ["get"]],
            [fn2, ["handle", "listFiles"]],
            [fn2.bucket, ["get"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    const bucket2 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const fn = new $Closure1(this, "$Closure1");
    const fn2 = new MyClosure(this, "MyClosure");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:call synthetic closure class as a function", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:call non-synthetic closure as a function", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_via_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

