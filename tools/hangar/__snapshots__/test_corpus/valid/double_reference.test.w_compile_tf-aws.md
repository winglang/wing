# [double_reference.test.w](../../../../../examples/tests/valid/double_reference.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $bar, $bar_foo, $initCount }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $bar.callFoo());
      (await $bar_foo.method());
      $helpers.assert($helpers.eq((await $initCount.peek()), 2), "initCount.peek() == /*1*/ 2");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.Bar-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Bar {
    constructor({ $this_foo }) {
      this.$this_foo = $this_foo;
    }
    async callFoo() {
      (await this.$this_foo.method());
    }
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.js.map
```

## inflight.Foo-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $initCount }) {
  class Foo {
    constructor({  }) {
    }
    async method() {
    }
    async $inflight_init() {
      (await $initCount.inc());
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
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
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
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.js")({
            $initCount: ${$stdlib.core.liftObject(initCount)},
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
      _supportedOps() {
        return [...super._supportedOps(), "method", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "$inflight_init": [
            [initCount, ["inc"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.foo = new Foo(this, "Foo");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Bar-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BarClient = ${Bar._toInflightType()};
            const client = new BarClient({
              $this_foo: ${$stdlib.core.liftObject(this.foo)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "callFoo", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "$inflight_init": [
            [this.foo, []],
          ],
          "callFoo": [
            [this.foo, ["method"]],
          ],
        });
        super.onLift(host, ops);
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
            $bar: ${$stdlib.core.liftObject(bar)},
            $bar_foo: ${$stdlib.core.liftObject(bar.foo)},
            $initCount: ${$stdlib.core.liftObject(initCount)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "handle": [
            [bar, ["callFoo"]],
            [bar.foo, ["method"]],
            [initCount, ["peek"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    const initCount = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    const bar = new Bar(this, "Bar");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:hello", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "double_reference.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

