# [capture_containers.test.w](../../../../../examples/tests/valid/capture_containers.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $Object_keys_myMap__length, $__bang__in___arrOfMap_at_0____, $__obj__args_______if__obj_args______undefined__throw_new_Error__Json_property____args___does_not_exist____return_obj_args_____j___b__, $__world__in__myMap__, $_arr_at_0__, $_arr_at_1__, $_mySet_has__my___, $arr_length, $mySet_size }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_arr_at_0__,"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_arr_at_1__,"world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($arr_length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mySet.has(\"my\")")})($_mySet_has__my___)};
      {((cond) => {if (!cond) throw new Error("assertion failed: mySet.size == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($mySet_size,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: myMap.has(\"world\")")})($__world__in__myMap__)};
      {((cond) => {if (!cond) throw new Error("assertion failed: myMap.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($Object_keys_myMap__length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arrOfMap.at(0).has(\"bang\")")})($__bang__in___arrOfMap_at_0____)};
      {((cond) => {if (!cond) throw new Error("assertion failed: j.get(\"b\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__obj__args_______if__obj_args______undefined__throw_new_Error__Json_property____args___does_not_exist____return_obj_args_____j___b__,"world")))};
    }
  }
  return $Closure1;
}

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
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $Object_keys_myMap__length: ${context._lift(Object.keys(myMap).length)},
            $__bang__in___arrOfMap_at_0____: ${context._lift(("bang" in ((arrOfMap.at(0)))))},
            $__obj__args_______if__obj_args______undefined__throw_new_Error__Json_property____args___does_not_exist____return_obj_args_____j___b__: ${context._lift(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(j, "b"))},
            $__world__in__myMap__: ${context._lift(("world" in (myMap)))},
            $_arr_at_0__: ${context._lift((arr.at(0)))},
            $_arr_at_1__: ${context._lift((arr.at(1)))},
            $_mySet_has__my___: ${context._lift((mySet.has("my")))},
            $arr_length: ${context._lift(arr.length)},
            $mySet_size: ${context._lift(mySet.size)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(("bang" in ((arrOfMap.at(0)))), host, []);
          $Closure1._registerOnLiftObject(("world" in (myMap)), host, []);
          $Closure1._registerOnLiftObject(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(j, "b"), host, []);
          $Closure1._registerOnLiftObject((arr.at(0)), host, []);
          $Closure1._registerOnLiftObject((arr.at(1)), host, []);
          $Closure1._registerOnLiftObject((mySet.has("my")), host, []);
          $Closure1._registerOnLiftObject(Object.keys(myMap).length, host, []);
          $Closure1._registerOnLiftObject(arr.length, host, []);
          $Closure1._registerOnLiftObject(mySet.size, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const arr = ["hello", "world"];
    const mySet = new Set(["my", "my", "set"]);
    const myMap = ({"hello": 123,"world": 999});
    const arrOfMap = [({"bang": 123})];
    const j = ({"a": "hello","b": "world"});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:capture_containers", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_containers.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

