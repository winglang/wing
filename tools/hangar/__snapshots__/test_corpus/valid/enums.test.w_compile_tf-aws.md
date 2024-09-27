# [enums.test.w](../../../../../tests/valid/enums.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $SomeEnum, $one, $two }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($one, $SomeEnum.ONE), "one == SomeEnum.ONE");
      $helpers.assert($helpers.eq($two, $SomeEnum.TWO), "two == SomeEnum.TWO");
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
module.exports = function({ $SomeEnum }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, $SomeEnum.ONE), "ONE"), "\"{SomeEnum.ONE}\" == \"ONE\"");
      $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, $SomeEnum.TWO), "TWO"), "\"{SomeEnum.TWO}\" == \"TWO\"");
      $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, $SomeEnum.THREE), "THREE"), "\"{SomeEnum.THREE}\" == \"THREE\"");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
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
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const SomeEnum =
      (function (tmp) {
        tmp["ONE"] = "ONE";
        tmp["TWO"] = "TWO";
        tmp["THREE"] = "THREE";
        return tmp;
      })({})
    ;
    const DocumentedEnum =
      (function (tmp) {
        tmp["VARIANT"] = "VARIANT";
        return tmp;
      })({})
    ;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $SomeEnum: ${$stdlib.core.liftObject(SomeEnum)},
            $one: ${$stdlib.core.liftObject(one)},
            $two: ${$stdlib.core.liftObject(two)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [SomeEnum, [].concat(["ONE"], ["TWO"])],
            [one, []],
            [two, []],
          ],
          "$inflight_init": [
            [SomeEnum, []],
            [one, []],
            [two, []],
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
            $SomeEnum: ${$stdlib.core.liftObject(SomeEnum)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [SomeEnum, [].concat(["ONE"], ["TWO"], ["THREE"])],
          ],
          "$inflight_init": [
            [SomeEnum, []],
          ],
        });
      }
    }
    const opt = undefined;
    const three = SomeEnum.THREE;
    const one = SomeEnum.ONE;
    const two = SomeEnum.TWO;
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight", new $Closure1(this, "$Closure1"));
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, SomeEnum.ONE), "ONE"), "\"{SomeEnum.ONE}\" == \"ONE\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, SomeEnum.TWO), "TWO"), "\"{SomeEnum.TWO}\" == \"TWO\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, SomeEnum.THREE), "THREE"), "\"{SomeEnum.THREE}\" == \"THREE\"");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:toStr inflight", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "enums.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

