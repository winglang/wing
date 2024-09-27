# [inflight_class_structural_interace_handler.test.w](../../../../../tests/valid/inflight_class_structural_interace_handler.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $NotGoo }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class YesGoo {
        async handle() {
          return 456;
        }
        async anotherMethod() {
          console.log("also fine");
        }
      }
      const y = (await (async () => {const o = new YesGoo(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq((await y.handle()), 456), "y.handle() == 456");
      const x = (await (async () => {const o = new $NotGoo(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq((await x.handle()), 123), "x.handle() == 123");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.NotGoo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class NotGoo {
    async handle() {
      return 123;
    }
  }
  return NotGoo;
}
//# sourceMappingURL=inflight.NotGoo-1.cjs.map
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
    class NotGoo extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.NotGoo-1.cjs")({
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
    if ($preflightTypesMap[1]) { throw new Error("NotGoo is already in type map"); }
    $preflightTypesMap[1] = NotGoo;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $NotGoo: ${$stdlib.core.liftObject(NotGoo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [NotGoo, []],
          ],
          "$inflight_init": [
            [NotGoo, []],
          ],
        });
      }
    }
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:structure interface types for 'handle'", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_structural_interace_handler.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

