# [json.test.w](../../../../../examples/tests/valid/json.test.w) | compile | tf-aws

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
    constructor($args) {
      const {  } = $args;
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
  },
  "resource": {
    "aws_s3_bucket": {
      "B1InList": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/B1InList/Default",
            "uniqueId": "B1InList"
          }
        },
        "bucket_prefix": "b1inlist-c8cc4391-",
        "force_destroy": false
      },
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      }
    }
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
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.SumStr = "wow!";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
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
          "$inflight_init": [
          ],
        });
      }
    }
    const jsonNumber = 123;
    const jsonBool = true;
    const jsonArray = [1, 2, 3];
    const jsonMap = ({["1"]: 1, ["2"]: 2, ["3"]: 3});
    const jsonObj = ({"boom": 123});
    for (const j of [jsonNumber, jsonBool, jsonArray, jsonMap, jsonObj]) {
      $helpers.assert($helpers.eq(j, $macros.__Json_parse(false, std.Json, $macros.__Json_stringify(false, std.Json, j))), "j == Json.parse(Json.stringify(j))");
    }
    const jsonMutObj = ({"hello": 123, "world": [1, "cat", 3], "boom boom": ({"hello": 1233})});
    const message = "Coolness";
    $macros.__MutJson_set(false, jsonMutObj, "hello", message);
    $helpers.assert($helpers.eq($macros.__MutJson_get(false, jsonMutObj, "hello"), message), "jsonMutObj.get(\"hello\") == message");
    const someNumber = 999;
    const jj = someNumber;
    const jj1 = ({"foo": someNumber});
    const jj2 = [someNumber, ({"bar": someNumber})];
    const getStr = (() => {
      return "hello";
    });
    const jj3 = (getStr());
    $helpers.assert($helpers.eq(jj3, "hello"), "jj3 == Json \"hello\"");
    const f = new Foo(this, "Foo");
    const jj4 = f.SumStr;
    $helpers.assert($helpers.eq(jj4, "wow!"), "jj4 == Json \"wow!\"");
    const someJson = ({"x": someNumber});
    $helpers.assert($helpers.eq($macros.__MutJson_get(false, someJson, "x"), someNumber), "someJson.get(\"x\") == someNumber");
    $macros.__MutJson_set(false, someJson, "x", 111);
    $helpers.assert($helpers.eq($macros.__MutJson_get(false, someJson, "x"), 111), "someJson.get(\"x\") == 111");
    const x = ({"cool": "beans"});
    const nestedJson = ({"a": "hello", "b": ({"c": "world", "d": ({"foo": "foo", "bar": 123})})});
    $macros.__MutJson_set(false, $macros.__MutJson_get(false, $macros.__MutJson_get(false, nestedJson, "b"), "d"), "foo", "tastic");
    $helpers.assert($helpers.eq($macros.__MutJson_get(false, $macros.__MutJson_get(false, $macros.__MutJson_get(false, nestedJson, "b"), "d"), "foo"), "tastic"), "nestedJson.get(\"b\").get(\"d\").get(\"foo\") == \"tastic\"");
    $helpers.assert($helpers.eq($macros.__MutJson_get(false, $macros.__MutJson_get(false, $macros.__MutJson_get(false, nestedJson, "b"), "d"), "bar"), 123), "nestedJson.get(\"b\").get(\"d\").get(\"bar\") == 123");
    const b = "buckle";
    const arr = [1, 2, b, "my", "shoe", 3, 4, ["shut", "the", "door"]];
    $helpers.assert($helpers.eq($macros.__Json_getAt(false, arr, 0), 1), "arr.getAt(0) == 1");
    $helpers.assert($helpers.eq($macros.__Json_getAt(false, arr, 2), b), "arr.getAt(2) == b");
    $helpers.assert($helpers.eq($macros.__Json_getAt(false, $macros.__Json_getAt(false, arr, 7), 0), "shut"), "arr.getAt(7).getAt(0) == \"shut\"");
    ({"a": [1, 2, "world"], "b": [1, 2, "world"]});
    const emptyJson = ({});
    const emptyJsonArr = [];
    const emptyMutJson = ({});
    const emptyMutJsonArr = [];
    $macros.__MutJson_set(false, emptyMutJson, "cool", ({"a": 1, "b": 2}));
    $macros.__MutJson_set(false, $macros.__MutJson_get(false, emptyMutJson, "cool"), "a", 3);
    $macros.__MutJson_setAt(false, emptyMutJsonArr, 0, ({"a": 1, "b": 2}));
    $macros.__MutJson_set(false, $macros.__MutJson_getAt(false, emptyMutJsonArr, 0), "a", 3);
    const theTowerOfJson = ({"a": ({}), "b": ({"c": ({}), "d": [[[({})]]]}), "e": ({"f": ({"g": ({}), "h": [({}), []]})})});
    $macros.__MutJson_set(false, $macros.__MutJson_getAt(false, $macros.__MutJson_get(false, $macros.__MutJson_get(false, $macros.__MutJson_get(false, theTowerOfJson, "e"), "f"), "h"), 0), "a", 1);
    const thatSuperNestedValue = $macros.__MutJson_get(false, $macros.__MutJson_getAt(false, $macros.__MutJson_get(false, $macros.__MutJson_get(false, $macros.__MutJson_get(false, theTowerOfJson, "e"), "f"), "h"), 0), "a");
    $helpers.assert($helpers.eq((std.Number.fromJson(thatSuperNestedValue)), 1), "num.fromJson(thatSuperNestedValue) == 1");
    const unestedJsonArr = [1, 2, 3];
    $helpers.assert($helpers.eq($macros.__Json_getAt(false, unestedJsonArr, 0), 1), "unestedJsonArr.getAt(0) == 1");
    const jsonElements = ({"strings": ({"single": "Hello", "array": ["Hello", "World", "!"]}), "numbers": ({"one": 1, "two": 2, "three": 3}), "bools": ({"t": true, "f": false})});
    {
      const $if_let_value = $macros.__Json_asStr(true, $macros.__Json_tryGet(true, $macros.__Json_tryGet(false, jsonElements, "strings"), "single"), );
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        $helpers.assert($helpers.eq(val, "Hello"), "val == \"Hello\"");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__Json_tryGet(true, $macros.__Json_tryGet(false, jsonElements, "strings"), "array");
      if ($if_let_value != undefined) {
        const vals = $if_let_value;
        {
          const $if_let_value = $macros.__Json_tryGetAt(false, vals, 0);
          if ($if_let_value != undefined) {
            const hello = $if_let_value;
            $helpers.assert($helpers.eq(hello, "Hello"), "hello == \"Hello\"");
          }
          else {
            $helpers.assert(false, "false");
          }
        }
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__Json_tryAsNum(true, $macros.__Json_tryGet(true, $macros.__Json_tryGet(false, jsonElements, "numbers"), "two"), );
      if ($if_let_value != undefined) {
        const two = $if_let_value;
        $helpers.assert($helpers.eq((two + 2), 4), "two + 2 == 4");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__Json_tryAsBool(true, $macros.__Json_tryGet(true, $macros.__Json_tryGet(false, jsonElements, "bools"), "t"), );
      if ($if_let_value != undefined) {
        const truth = $if_let_value;
        $helpers.assert(truth, "truth");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__Json_tryGet(true, $macros.__Json_tryGet(true, $macros.__Json_tryGet(true, $macros.__Json_tryGet(false, jsonElements, "strings"), "non"), "existant"), "element");
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__Json_tryGetAt(true, $macros.__Json_tryGetAt(true, $macros.__Json_tryGet(false, jsonElements, "cant"), 1000), 42);
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        $helpers.assert(false, "false");
      }
    }
    const notSpecified = ({"foo": "bar"});
    $helpers.assert($helpers.eq($macros.__Json_get(false, notSpecified, "foo"), "bar"), "notSpecified.get(\"foo\") == \"bar\"");
    const empty = ({});
    $helpers.assert($helpers.eq($macros.__Json_has(false, empty, "something"), false), "empty.has(\"something\") == false");
    const arrayStruct = [({"foo": "", "stuff": []})];
    const setStruct = new Set([({"foo": "", "stuff": []})]);
    const mapStruct = ({["1"]: ({"foo": "", "stuff": []})});
    const deepCollectionStruct = ({["1"]: [new Set([({"foo": "", "stuff": []})])]});
    const notJsonMissingField = ({"foo": "bar", "stuff": []});
    const notJsonWithInnerArray = ({"foo": "bar", "stuff": [], "buckets": [globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "B1InList")]});
    const notJson = ({"foo": "bar", "stuff": [1, 2, 3], "maybe": ({"good": true, "inner_stuff": [({"hi": 1, "base": "base"})]})});
    let mutableJson = ({"foo": "bar", "stuff": [1, 2, 3], "maybe": ({"good": true, "inner_stuff": [({"hi": 1, "base": "base"})]})});
    const hasBucket = ({"a": ({"a": globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket")})});
    const numVar = 1;
    const strVar = "s";
    const punnedJson1 = ({"numVar": numVar, "strVar": strVar});
    $helpers.assert($helpers.eq($helpers.lookup(punnedJson1, "numVar"), 1), "punnedJson1[\"numVar\"] == 1");
    $helpers.assert($helpers.eq($helpers.lookup(punnedJson1, "strVar"), "s"), "punnedJson1[\"strVar\"] == \"s\"");
    const punnedMutJson1 = ({"numVar": numVar});
    $macros.__MutJson_set(false, punnedMutJson1, "numVar", ($macros.__MutJson_asNum(false, $helpers.lookup(punnedMutJson1, "numVar"), ) + 1));
    $helpers.assert($helpers.eq($helpers.lookup(punnedMutJson1, "numVar"), 2), "punnedMutJson1[\"numVar\"] == 2");
    const structToPunFromJson = ({"numVar": numVar, "strVar": strVar});
    $helpers.assert($helpers.eq(structToPunFromJson.numVar, 1), "structToPunFromJson.numVar == 1");
    $helpers.assert($helpers.eq(structToPunFromJson.strVar, "s"), "structToPunFromJson.strVar == \"s\"");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

