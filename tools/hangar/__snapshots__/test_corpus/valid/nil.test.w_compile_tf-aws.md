# [nil.test.w](../../../../../tests/valid/nil.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $foo }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.neq((await $foo.returnNil(true)), undefined), "foo.returnNil(true) != nil");
      $helpers.assert($helpers.eq((await $foo.returnNil(false)), undefined), "foo.returnNil(false) == nil");
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
      $helpers.assert($helpers.eq((await $foo.getOptionalValue()), undefined), "foo.getOptionalValue() == nil");
      (await $foo.setOptionalValue("hello"));
      $helpers.assert($helpers.neq((await $foo.getOptionalValue()), undefined), "foo.getOptionalValue() != nil");
      (await $foo.setOptionalValue(undefined));
      $helpers.assert($helpers.eq((await $foo.getOptionalValue()), undefined), "foo.getOptionalValue() == nil");
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
    async returnNil(t) {
      if (t) {
        return "hello";
      }
      return undefined;
    }
    async setOptionalValue(msg) {
      this.optionalVar = msg;
    }
    async getOptionalValue() {
      return this.optionalVar;
    }
    async $inflight_init() {
      this.optionalVar = undefined;
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
const $types = require("./types.cjs");
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
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
      get _liftMap() {
        return ({
          "returnNil": [
          ],
          "setOptionalValue": [
          ],
          "getOptionalValue": [
          ],
          "$inflight_init": [
          ],
          "optionalVar": [
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
            $foo: ${$stdlib.core.liftObject(foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [foo, ["returnNil"]],
          ],
          "$inflight_init": [
            [foo, []],
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
            [foo, [].concat(["getOptionalValue"], ["setOptionalValue"])],
          ],
          "$inflight_init": [
            [foo, []],
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:nil return", new $Closure1(this, "$Closure1"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:optional instance variable", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "nil.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

