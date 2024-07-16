# [lift_via_closure.test.w](../../../../../examples/tests/valid/lift_via_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
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
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
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
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.MyClosure-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
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
//# sourceMappingURL=inflight.MyClosure-1.cjs.map
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
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      },
      "MyClosure_Bucket_874B5056": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyClosure/Bucket/Default",
            "uniqueId": "MyClosure_Bucket_874B5056"
          }
        },
        "bucket_prefix": "bucket-c8fe564c-",
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
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
            [bucket2, ["put"]],
          ],
          "$inflight_init": [
            [bucket2, []],
          ],
        });
      }
    }
    class MyClosure extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        this.bucket = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyClosure-1.cjs")({
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClosureClient = ${MyClosure._toInflightType()};
            const client = new MyClosureClient({
              $this_bucket: ${$stdlib.core.liftObject(this.bucket)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [this, ["putFile"]],
          ],
          "putFile": [
            [this.bucket, ["put"]],
          ],
          "listFiles": [
            [bucket2, ["put"]],
            [this.bucket, ["list"]],
          ],
          "$inflight_init": [
            [bucket2, []],
            [this.bucket, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $fn: ${$stdlib.core.liftObject(fn)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [fn, ["handle"]],
          ],
          "$inflight_init": [
            [fn, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
            $fn2: ${$stdlib.core.liftObject(fn2)},
            $fn2_bucket: ${$stdlib.core.liftObject(fn2.bucket)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [bucket2, ["get"]],
            [fn2, [].concat(["handle"], ["listFiles"])],
            [fn2.bucket, ["get"]],
          ],
          "$inflight_init": [
            [bucket2, []],
            [fn2, []],
            [fn2.bucket, []],
          ],
        });
      }
    }
    const bucket2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const fn = new $Closure1(this, "$Closure1");
    const fn2 = new MyClosure(this, "MyClosure");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:call synthetic closure class as a function", new $Closure2(this, "$Closure2"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:call non-synthetic closure as a function", new $Closure3(this, "$Closure3"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_via_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

