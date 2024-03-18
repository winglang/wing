# [extern_implementation.test.w](../../../../../examples/tests/valid/extern_implementation.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $f }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f.call());
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
module.exports = function({ $Foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $Foo.print("hey there"));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.Foo-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    static async regexInflight(pattern, text) {
      return (require("../../../external_js.js")["regexInflight"])(pattern, text)
    }
    static async getUuid() {
      return (require("../../../external_js.js")["getUuid"])()
    }
    static async getData() {
      return (require("../../../external_js.js")["getData"])()
    }
    static async print(msg) {
      return (require("../../../external_js.js")["print"])(msg)
    }
    async call() {
      $helpers.assert((await Foo.regexInflight("[a-z]+-\\d+", "abc-123")), "Foo.regexInflight(\"[a-z]+-\\\\d+\", \"abc-123\")");
      const uuid = (await Foo.getUuid());
      $helpers.assert($helpers.eq(uuid.length, 36), "uuid.length == 36");
      $helpers.assert($helpers.eq((await Foo.getData()), "Cool data!"), "Foo.getData() == \"Cool data!\"");
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.js.map
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
      "my-bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/my-bucket/Default",
            "uniqueId": "my-bucket"
          }
        },
        "bucket_prefix": "my-bucket-c8fafcc6-",
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
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static getGreeting(name) {
        return (require("../../../external_js.js")["getGreeting"])(name)
      }
      static preflightBucket(bucket, id) {
        return (require("../../../external_js.js")["preflightBucket"])(bucket, id)
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType()};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "call": [
            [Foo, ["getData", "getUuid", "regexInflight"]],
          ],
          "$inflight_init": [
            [Foo, []],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "regexInflight": [
          ],
          "getUuid": [
          ],
          "getData": [
          ],
          "print": [
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
            $f: ${$stdlib.core.liftObject(f)},
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
            [f, ["call"]],
          ],
          "$inflight_init": [
            [f, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
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
            [Foo, ["print"]],
          ],
          "$inflight_init": [
            [Foo, []],
          ],
        });
      }
    }
    $helpers.assert($helpers.eq((Foo.getGreeting("Wingding")), "Hello, Wingding!"), "Foo.getGreeting(\"Wingding\") == \"Hello, Wingding!\"");
    const f = new Foo(this, "Foo");
    const bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "my-bucket");
    const result = (Foo.preflightBucket(bucket, "my-bucket"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:call", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:console", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "extern_implementation.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

