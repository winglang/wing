# [assert.test.w](../../../../../examples/tests/valid/assert.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $s1, $s2 }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq("", ""), "\"\" == \"\"");
      $helpers.assert($helpers.eq("'", "'"), "\"\'\" == \"\'\"");
      $helpers.assert($helpers.eq("\"", "\""), "\"\\\"\" == \"\\\"\"");
      $helpers.assert($helpers.eq("`", "`"), "\"`\" == \"`\"");
      $helpers.assert($helpers.eq("``", "``"), "\"``\" == \"``\"");
      $helpers.assert($helpers.eq("`s1`", "`s1`"), "\"`s1`\" == \"`s1`\"");
      $helpers.assert($helpers.eq($s1, $s1), "s1 == s1");
      $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, $s1), String.raw({ raw: ["", ""] }, $s1)), "\"{s1}\" == \"{s1}\"");
      $helpers.assert($helpers.neq(String.raw({ raw: ["", ""] }, $s1), String.raw({ raw: ["", ""] }, $s2)), "\"{s1}\" != \"{s2}\"");
      $helpers.assert($helpers.eq(String.raw({ raw: ["a", ""] }, $s1), String.raw({ raw: ["a", ""] }, $s1)), "\"a{s1}\" == \"a{s1}\"");
      $helpers.assert($helpers.neq(String.raw({ raw: ["a", ""] }, $s1), String.raw({ raw: ["b", ""] }, $s1)), "\"a{s1}\" != \"b{s1}\"");
      $helpers.assert($helpers.eq(String.raw({ raw: ["", "a"] }, $s1), String.raw({ raw: ["", "a"] }, $s1)), "\"{s1}a\" == \"{s1}a\"");
      $helpers.assert($helpers.neq(String.raw({ raw: ["", "a"] }, $s1), String.raw({ raw: ["", "b"] }, $s1)), "\"{s1}a\" != \"{s1}b\"");
      $helpers.assert($helpers.eq(String.raw({ raw: ["`'", ""] }, $s1), String.raw({ raw: ["`'", ""] }, $s1)), "\"`\'{s1}\" == \"`\'{s1}\"");
      $helpers.assert($helpers.eq(String.raw({ raw: ["a", "b", "c"] }, $s1, $s2), String.raw({ raw: ["a", "b", "c"] }, $s1, $s2)), "\"a{s1}b{s2}c\" == \"a{s1}b{s2}c\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $s1: ${$stdlib.core.liftObject(s1)},
            $s2: ${$stdlib.core.liftObject(s2)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "handle": [
            [s1, []],
            [s2, []],
          ],
          "$inflight_init": [
            [s1, []],
            [s2, []],
          ],
        });
      }
    }
    const s1 = "foo";
    const s2 = "bar";
    $helpers.assert($helpers.eq("", ""), "\"\" == \"\"");
    $helpers.assert($helpers.eq("'", "'"), "\"\'\" == \"\'\"");
    $helpers.assert($helpers.eq("\"", "\""), "\"\\\"\" == \"\\\"\"");
    $helpers.assert($helpers.eq("`", "`"), "\"`\" == \"`\"");
    $helpers.assert($helpers.eq("``", "``"), "\"``\" == \"``\"");
    $helpers.assert($helpers.eq("`s1`", "`s1`"), "\"`s1`\" == \"`s1`\"");
    $helpers.assert($helpers.eq(s1, s1), "s1 == s1");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", ""] }, s1), String.raw({ raw: ["", ""] }, s1)), "\"{s1}\" == \"{s1}\"");
    $helpers.assert($helpers.neq(String.raw({ raw: ["", ""] }, s1), String.raw({ raw: ["", ""] }, s2)), "\"{s1}\" != \"{s2}\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["a", ""] }, s1), String.raw({ raw: ["a", ""] }, s1)), "\"a{s1}\" == \"a{s1}\"");
    $helpers.assert($helpers.neq(String.raw({ raw: ["a", ""] }, s1), String.raw({ raw: ["b", ""] }, s1)), "\"a{s1}\" != \"b{s1}\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["", "a"] }, s1), String.raw({ raw: ["", "a"] }, s1)), "\"{s1}a\" == \"{s1}a\"");
    $helpers.assert($helpers.neq(String.raw({ raw: ["", "a"] }, s1), String.raw({ raw: ["", "b"] }, s1)), "\"{s1}a\" != \"{s1}b\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["`'", ""] }, s1), String.raw({ raw: ["`'", ""] }, s1)), "\"`\'{s1}\" == \"`\'{s1}\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["a", "b", "c"] }, s1, s2), String.raw({ raw: ["a", "b", "c"] }, s1, s2)), "\"a{s1}b{s2}c\" == \"a{s1}b{s2}c\"");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:assert works inflight", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "assert.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

