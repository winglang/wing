# [calling_inflight_variants.test.w](../../../../../examples/tests/valid/calling_inflight_variants.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return 1;
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
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $foo.callFn(true)), 1), "foo.callFn(true) == 1");
      $helpers.assert($helpers.eq((await $foo.callFn(false)), 2), "foo.callFn(false) == 2");
      (await $foo.callFn2());
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
    constructor({ $this_inflight1 }) {
      this.$this_inflight1 = $this_inflight1;
    }
    async makeFn(x) {
      if ($helpers.eq(x, true)) {
        return this.$this_inflight1;
      }
      else {
        return this.inflight2;
      }
    }
    async callFn(x) {
      const partialFn = (await this.makeFn(x));
      return (await partialFn());
    }
    async callFn2() {
      const one = (await this.$this_inflight1());
      const two = (await this.inflight2());
      $helpers.assert($helpers.eq(one, 1), "one == 1");
      $helpers.assert($helpers.eq(two, 2), "two == 2");
    }
    async $inflight_init() {
      this.inflight2 = async () => {
        return 2;
      };
      const ret = (await this.inflight2());
      $helpers.assert($helpers.eq(ret, 2), "ret == 2");
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
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("./inflight.$Closure1-1.js")({
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
            super.onLift(host, ops);
          }
          static onLiftType(host, ops) {
            super.onLiftType(host, ops);
          }
        }
        this.inflight1 = new $Closure1(this, "$Closure1");
      }
      static _toInflightType() {
        return `
          require("./inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
              $this_inflight1: ${$stdlib.core.liftObject(this.inflight1)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "inflight2", "makeFn", "callFn", "callFn2", "$inflight_init"];
      }
      onLift(host, ops) {
        Foo._onLiftMatrix(host, ops, {
          "$inflight_init": [
            [this.inflight1, []],
          ],
          "callFn": [
          ],
          "callFn2": [
            [this.inflight1, ["handle"]],
          ],
          "makeFn": [
            [this.inflight1, ["handle"]],
          ],
        });
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
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
            $foo: ${$stdlib.core.liftObject(foo)},
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
            [foo, ["callFn", "callFn2"]],
          ],
        });
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
      }
    }
    const foo = new Foo(this, "Foo");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:calling different types of inflights", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "calling_inflight_variants.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

