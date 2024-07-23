# [inheritance_class_preflight.test.w](../../../../../examples/tests/valid/inheritance_class_preflight.test.w) | compile | tf-aws

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $FooBase }) {
  class Foo extends $FooBase {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## inflight.FooBase-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class FooBase {
    constructor($args) {
      const {  } = $args;
    }
  }
  return FooBase;
}
//# sourceMappingURL=inflight.FooBase-1.cjs.map
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
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class FooBase extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      bar() {
        return "bar";
      }
      over() {
        return "base";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.FooBase-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class Foo extends FooBase {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      baz() {
        return true;
      }
      over() {
        return "derived";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
            $FooBase: ${$stdlib.core.liftObject(FooBase)},
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    (expect.Util.equal((foo.bar()), "bar"));
    (expect.Util.equal((foo.baz()), true));
    (expect.Util.equal((foo.over()), "derived"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inheritance_class_preflight.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

