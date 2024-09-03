# [std_string.test.w](../../../../../tests/valid/std_string.test.w) | compile | tf-aws

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
      console.log(String.raw({ raw: ["index of \"s\" in s1 is ", ""] }, $macros.__String_indexOf(false, $s1, "s")));
      console.log($macros.__Array_at(false, (await $s1.split(" ")), 1));
      console.log((await $s1.concat($s2)));
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
      get _liftMap() {
        return ({
          "handle": [
            [s1, [].concat(["indexOf"], ["split"], ["concat"])],
            [s2, []],
          ],
          "$inflight_init": [
            [s1, []],
            [s2, []],
          ],
        });
      }
    }
    const s1 = "some string";
    const s2 = "s are immutable";
    $helpers.assert($helpers.eq(s1.length, 11), "s1.length == 11");
    $helpers.assert($helpers.eq($macros.__String_at(false, s1, 7), "r"), "s1.at(7) == \"r\"");
    $helpers.assert($helpers.eq((s1.concat(s2)), "some strings are immutable"), "s1.concat(s2) == \"some strings are immutable\"");
    $helpers.assert($macros.__String_contains(false, s1, "some"), "s1.contains(\"some\")");
    $helpers.assert((!$macros.__String_contains(false, "some", s1)), "!\"some\".contains(s1)");
    $helpers.assert($macros.__String_endsWith(false, s1, "string"), "s1.endsWith(\"string\")");
    $helpers.assert($helpers.eq($macros.__String_indexOf(false, s1, "s"), 0), "s1.indexOf(\"s\") == 0");
    $helpers.assert($helpers.eq($macros.__String_lowercase(false, "Some String", ), "some string"), "\"Some String\".lowercase() == \"some string\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, (s1.split(" ")), 0), "some"), "s1.split(\" \").at(0) == \"some\"");
    $helpers.assert($macros.__String_startsWith(false, s1, "some"), "s1.startsWith(\"some\")");
    $helpers.assert($helpers.eq((s1.substring(5)), "string"), "s1.substring(5) == \"string\"");
    $helpers.assert($helpers.eq((s1.substring(5, 7)), "st"), "s1.substring(5, 7) == \"st\"");
    $helpers.assert($helpers.eq(("   some string   ".trim()), "some string"), "\"   some string   \".trim() == \"some string\"");
    $helpers.assert($helpers.eq($macros.__String_uppercase(false, "Some String", ), "SOME STRING"), "\"Some String\".uppercase() == \"SOME STRING\"");
    $helpers.assert($helpers.eq(("hello" + " world"), "hello world"), "\"hello\" + \" world\" == \"hello world\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["hello ", "\n world"] }, "funky"), "hello funky\n world"), "\n\"hello {\"funky\"}\n world\" == \"hello funky\\n world\"");
    let initial = "hey, ";
    initial += "you";
    $helpers.assert($helpers.eq(initial, "hey, you"), "initial == \"hey, you\"");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:string", new $Closure1(this, "$Closure1"));
    const s3 = "hello\nworld";
    const s4 = "hello\nworld";
    $helpers.assert($helpers.eq(s3, s4), "s3 == s4");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "std_string.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

