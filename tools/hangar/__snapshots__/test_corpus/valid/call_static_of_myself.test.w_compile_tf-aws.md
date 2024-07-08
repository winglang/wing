# [call_static_of_myself.test.w](../../../../../examples/tests/valid/call_static_of_myself.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Bar, $Foo, $foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class Zoo {
        static async zoo() {
          return 3;
        }
      }
      const bar = (await (async () => {const o = new $Bar(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq((await $Foo.foo()), 1), "Foo.foo() == 1");
      $helpers.assert($helpers.eq((await $Bar.bar()), 2), "Bar.bar() == 2");
      $helpers.assert($helpers.eq((await Zoo.zoo()), 3), "Zoo.zoo() == 3");
      $helpers.assert($helpers.eq((await $foo.callThis()), 1), "foo.callThis() == 1");
      $helpers.assert($helpers.eq((await bar.callThis()), 2), "bar.callThis() == 2");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Bar-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Bar {
    static async bar() {
      return 2;
    }
    async callThis() {
      return (await Bar.bar());
    }
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    static async foo() {
      return 1;
    }
    static async bar() {
      return (await Foo.foo());
    }
    async callThis() {
      return (await Foo.bar());
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
          "callThis": [
            [Foo, ["bar"]],
          ],
          "$inflight_init": [
            [Foo, []],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "foo": [
          ],
          "bar": [
            [Foo, ["foo"]],
          ],
        });
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Bar-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BarClient = ${Bar._toInflightType()};
            const client = new BarClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "callThis": [
            [Bar, ["bar"]],
          ],
          "$inflight_init": [
            [Bar, []],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "bar": [
          ],
        });
      }
    }
    if ($preflightTypesMap[2]) { throw new Error("Bar is already in type map"); }
    $preflightTypesMap[2] = Bar;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $Bar: ${$stdlib.core.liftObject(Bar)},
            $Foo: ${$stdlib.core.liftObject(Foo)},
            $foo: ${$stdlib.core.liftObject(foo)},
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
            [$helpers.preflightClassSingleton(this, 2), ["callThis"]],
            [Bar, ["bar"]],
            [Foo, ["foo"]],
            [foo, ["callThis"]],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 2), []],
            [Bar, []],
            [Foo, []],
            [foo, []],
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "call_static_of_myself.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

