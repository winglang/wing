# [lift_expr_with_this.test.w](../../../../../examples/tests/valid/lift_expr_with_this.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({ $foo_this_value }) {
      this.$foo_this_value = $foo_this_value;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq(this.$foo_this_value, "hello"), "foo_this.value == \"hello\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
if (globalThis.$ClassFactory !== undefined) { throw new Error("$ClassFactory already defined"); }
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.value = "hello";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
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
          "$inflight_init": [
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
              $foo_this_value: ${$stdlib.core.liftObject(foo_this.value)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [foo_this.value, []],
          ],
          "$inflight_init": [
            [foo_this.value, []],
          ],
        });
      }
    }
    const foo_this = new Foo(this, "Foo");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "lift_expr_with_this.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

