# [std_string.test.w](../../../../../examples/tests/valid/std_string.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index_______s1_split________1_, $_s1_concat_s2__, $s1_indexOf__s__ }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      console.log(String.raw({ raw: ["index of \"s\" in s1 is ", ""] }, $s1_indexOf__s__));
      console.log($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index_______s1_split________1_);
      console.log($_s1_concat_s2__);
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index_______s1_split________1_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((s1.split(" ")), 1))},
            $_s1_concat_s2__: ${$stdlib.core.liftObject((s1.concat(s2)))},
            $s1_indexOf__s__: ${$stdlib.core.liftObject(s1.indexOf("s"))},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "handle": [
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((s1.split(" ")), 1), []],
            [(s1.concat(s2)), []],
            [s1.indexOf("s"), []],
          ],
        });
        super.onLift(host, ops);
      }
    }
    const s1 = "some string";
    const s2 = "s are immutable";
    $helpers.assert($helpers.eq(s1.length, 11), "s1.length == 11");
    $helpers.assert($helpers.eq(((args) => { if (7 >= s1.length || 7 + s1.length < 0) {throw new Error("index out of bounds")}; return s1.at(7) })(7), "r"), "s1.at(7) == \"r\"");
    $helpers.assert($helpers.eq((s1.concat(s2)), "some strings are immutable"), "s1.concat(s2) == \"some strings are immutable\"");
    $helpers.assert(s1.includes("some"), "s1.contains(\"some\")");
    $helpers.assert((!"some".includes(s1)), "!\"some\".contains(s1)");
    $helpers.assert(s1.endsWith("string"), "s1.endsWith(\"string\")");
    $helpers.assert($helpers.eq(s1.indexOf("s"), 0), "s1.indexOf(\"s\") == 0");
    $helpers.assert($helpers.eq("Some String".toLocaleLowerCase(), "some string"), "\"Some String\".lowercase() == \"some string\"");
    $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })((s1.split(" ")), 0), "some"), "s1.split(\" \").at(0) == \"some\"");
    $helpers.assert(s1.startsWith("some"), "s1.startsWith(\"some\")");
    $helpers.assert($helpers.eq((s1.substring(5)), "string"), "s1.substring(5) == \"string\"");
    $helpers.assert($helpers.eq((s1.substring(5, 7)), "st"), "s1.substring(5, 7) == \"st\"");
    $helpers.assert($helpers.eq(("   some string   ".trim()), "some string"), "\"   some string   \".trim() == \"some string\"");
    $helpers.assert($helpers.eq("Some String".toLocaleUpperCase(), "SOME STRING"), "\"Some String\".uppercase() == \"SOME STRING\"");
    $helpers.assert($helpers.eq(("hello" + " world"), "hello world"), "\"hello\" + \" world\" == \"hello world\"");
    $helpers.assert($helpers.eq(String.raw({ raw: ["hello ", "\n world"] }, "funky"), "hello funky\n world"), "\n\"hello {\"funky\"}\n world\" == \"hello funky\\n world\"");
    let initial = "hey, ";
    initial += "you";
    $helpers.assert($helpers.eq(initial, "hey, you"), "initial == \"hey, you\"");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:string", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "std_string.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

