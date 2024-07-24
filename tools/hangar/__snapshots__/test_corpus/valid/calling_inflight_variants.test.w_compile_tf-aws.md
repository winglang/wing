# [calling_inflight_variants.test.w](../../../../../examples/tests/valid/calling_inflight_variants.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
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
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
    constructor($args) {
      const { $this_inflight1 } = $args;
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
      this.inflight2 = (async () => {
        return 2;
      });
      const ret = (await this.inflight2());
      $helpers.assert($helpers.eq(ret, 2), "ret == 2");
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
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
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        class $Closure1 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
              })
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        this.inflight1 = new $Closure1(this, "$Closure1");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_inflight1: $stdlib.core.liftObject(this.inflight1),
        };
      }
      get _liftMap() {
        return ({
          "makeFn": [
            [this, ["inflight2"]],
            [this.inflight1, ["handle"]],
          ],
          "callFn": [
            [this, ["makeFn"]],
          ],
          "callFn2": [
            [this, ["inflight2"]],
            [this.inflight1, ["handle"]],
          ],
          "$inflight_init": [
            [this, ["inflight2"]],
            [this.inflight1, []],
          ],
          "inflight2": [
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
            $foo: ${$stdlib.core.liftObject(foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [foo, [].concat(["callFn"], ["callFn2"])],
          ],
          "$inflight_init": [
            [foo, []],
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:calling different types of inflights", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "calling_inflight_variants.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

