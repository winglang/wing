# [capture_containers.test.w](../../../../../examples/tests/valid/capture_containers.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Object_keys_myMap__length, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arr__0_, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arr__1_, $__bang__in____arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arrOfMap__0___, $__obj__args_______if__obj_args______undefined__throw_new_Error__Json_property____args___does_not_exist____return_obj_args_____j___b__, $__world__in__myMap__, $_mySet_has__my___, $arr_length, $mySet_size }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arr__0_, "hello"), "arr.at(0) == \"hello\"");
      $helpers.assert($helpers.eq($__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arr__1_, "world"), "arr.at(1) == \"world\"");
      $helpers.assert($helpers.eq($arr_length, 2), "arr.length == 2");
      $helpers.assert($_mySet_has__my___, "mySet.has(\"my\")");
      $helpers.assert($helpers.eq($mySet_size, 2), "mySet.size == 2");
      $helpers.assert($__world__in__myMap__, "myMap.has(\"world\")");
      $helpers.assert($helpers.eq($Object_keys_myMap__length, 2), "myMap.size() == 2");
      $helpers.assert($__bang__in____arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arrOfMap__0___, "arrOfMap.at(0).has(\"bang\")");
      $helpers.assert($helpers.eq($__obj__args_______if__obj_args______undefined__throw_new_Error__Json_property____args___does_not_exist____return_obj_args_____j___b__, "world"), "j.get(\"b\") == \"world\"");
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
      "version": "0.20.3"
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
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
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
            $Object_keys_myMap__length: ${$stdlib.core.liftObject(Object.keys(myMap).length)},
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arr__0_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arr, 0))},
            $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arr__1_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arr, 1))},
            $__bang__in____arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______arrOfMap__0___: ${$stdlib.core.liftObject(("bang" in (((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arrOfMap, 0))))},
            $__obj__args_______if__obj_args______undefined__throw_new_Error__Json_property____args___does_not_exist____return_obj_args_____j___b__: ${$stdlib.core.liftObject(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(j, "b"))},
            $__world__in__myMap__: ${$stdlib.core.liftObject(("world" in (myMap)))},
            $_mySet_has__my___: ${$stdlib.core.liftObject((mySet.has("my")))},
            $arr_length: ${$stdlib.core.liftObject(arr.length)},
            $mySet_size: ${$stdlib.core.liftObject(mySet.size)},
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
            [("bang" in (((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arrOfMap, 0))), []],
            [("world" in (myMap)), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arr, 0), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arr, 1), []],
            [((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(j, "b"), []],
            [(mySet.has("my")), []],
            [Object.keys(myMap).length, []],
            [arr.length, []],
            [mySet.size, []],
          ],
          "$inflight_init": [
            [("bang" in (((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arrOfMap, 0))), []],
            [("world" in (myMap)), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arr, 0), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arr, 1), []],
            [((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(j, "b"), []],
            [(mySet.has("my")), []],
            [Object.keys(myMap).length, []],
            [arr.length, []],
            [mySet.size, []],
          ],
        });
      }
    }
    const arr = ["hello", "world"];
    const mySet = new Set(["my", "my", "set"]);
    const myMap = ({["hello"]: 123, ["world"]: 999});
    const arrOfMap = [({["bang"]: 123})];
    const j = ({"a": "hello", "b": "world"});
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:capture_containers", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_containers.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

