# [json.test.w](../../../../../examples/tests/valid/json.test.w) | compile | tf-aws

## inflight.Foo-1.js
```js
"use strict";
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
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
  },
  "resource": {
    "aws_s3_bucket": {
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    }
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
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.SumStr = "wow!";
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    const jsonNumber = 123;
    const jsonBool = true;
    const jsonArray = [1, 2, 3];
    const jsonMap = ({"1": 1,"2": 2,"3": 3});
    const jsonObj = ({"boom": 123});
    for (const j of [jsonNumber, jsonBool, jsonArray, jsonMap, jsonObj]) {
      {((cond) => {if (!cond) throw new Error("assertion failed: j == Json.parse(Json.stringify(j))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(j,(JSON.parse(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([j]))))))};
    }
    const jsonMutObj = ({"hello": 123,"world": [1, "cat", 3],"boom boom": ({"hello": 1233})});
    const message = "Coolness";
    ((obj, args) => { obj[args[0]] = args[1]; })(jsonMutObj, ["hello", message]);
    {((cond) => {if (!cond) throw new Error("assertion failed: jsonMutObj.get(\"hello\") == message")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(jsonMutObj, "hello"),message)))};
    const someNumber = 999;
    const jj = someNumber;
    const jj1 = ({"foo": someNumber});
    const jj2 = [someNumber, ({"bar": someNumber})];
    const getStr = (() => {
      return "hello";
    });
    const jj3 = (getStr());
    {((cond) => {if (!cond) throw new Error("assertion failed: jj3 == Json \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(jj3,"hello")))};
    const f = new Foo(this, "Foo");
    const jj4 = f.SumStr;
    {((cond) => {if (!cond) throw new Error("assertion failed: jj4 == Json \"wow!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(jj4,"wow!")))};
    const someJson = ({"x": someNumber});
    {((cond) => {if (!cond) throw new Error("assertion failed: someJson.get(\"x\") == someNumber")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(someJson, "x"),someNumber)))};
    ((obj, args) => { obj[args[0]] = args[1]; })(someJson, ["x", 111]);
    {((cond) => {if (!cond) throw new Error("assertion failed: someJson.get(\"x\") == 111")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(someJson, "x"),111)))};
    const x = ({"cool": "beans"});
    const nestedJson = ({"a": "hello","b": ({"c": "world","d": ({"foo": "foo","bar": 123})})});
    ((obj, args) => { obj[args[0]] = args[1]; })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(nestedJson, "b"), "d"), ["foo", "tastic"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: nestedJson.get(\"b\").get(\"d\").get(\"foo\") == \"tastic\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(nestedJson, "b"), "d"), "foo"),"tastic")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: nestedJson.get(\"b\").get(\"d\").get(\"bar\") == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(nestedJson, "b"), "d"), "bar"),123)))};
    const b = "buckle";
    const arr = [1, 2, b, "my", "shoe", 3, 4, ["shut", "the", "door"]];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr.getAt(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(arr, 0),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr.getAt(2) == b")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(arr, 2),b)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr.getAt(7).getAt(0) == \"shut\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(arr, 7), 0),"shut")))};
    ({"a": [1, 2, "world"],"b": [1, 2, "world"]});
    const emptyJson = ({});
    const emptyJsonArr = [];
    const emptyMutJson = ({});
    const emptyMutJsonArr = [];
    ((obj, args) => { obj[args[0]] = args[1]; })(emptyMutJson, ["cool", ({"a": 1,"b": 2})]);
    ((obj, args) => { obj[args[0]] = args[1]; })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(emptyMutJson, "cool"), ["a", 3]);
    ((obj, args) => { obj[args[0]] = args[1]; })(emptyMutJsonArr, [0, ({"a": 1,"b": 2})]);
    ((obj, args) => { obj[args[0]] = args[1]; })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(emptyMutJsonArr, 0), ["a", 3]);
    const theTowerOfJson = ({"a": ({}),"b": ({"c": ({}),"d": [[[({})]]]}),"e": ({"f": ({"g": ({}),"h": [({}), []]})})});
    ((obj, args) => { obj[args[0]] = args[1]; })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(theTowerOfJson, "e"), "f"), "h"), 0), ["a", 1]);
    const thatSuperNestedValue = ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(theTowerOfJson, "e"), "f"), "h"), 0), "a");
    {((cond) => {if (!cond) throw new Error("assertion failed: num.fromJson(thatSuperNestedValue) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Number.fromJson(thatSuperNestedValue)),1)))};
    const unestedJsonArr = [1, 2, 3];
    {((cond) => {if (!cond) throw new Error("assertion failed: unestedJsonArr.getAt(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(unestedJsonArr, 0),1)))};
    const jsonElements = ({"strings": ({"single": "Hello","array": ["Hello", "World", "!"]}),"numbers": ({"one": 1,"two": 2,"three": 3}),"bools": ({"t": true,"f": false})});
    {
      const $if_let_value = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((jsonElements)?.["strings"])?.["single"]);
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: val == \"Hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(val,"Hello")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = ((jsonElements)?.["strings"])?.["array"];
      if ($if_let_value != undefined) {
        const vals = $if_let_value;
        {
          const $if_let_value = (vals)?.[0];
          if ($if_let_value != undefined) {
            const hello = $if_let_value;
            {((cond) => {if (!cond) throw new Error("assertion failed: hello == \"Hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(hello,"Hello")))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })(((jsonElements)?.["numbers"])?.["two"]);
      if ($if_let_value != undefined) {
        const two = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: two + 2 == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((two + 2),4)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })(((jsonElements)?.["bools"])?.["t"]);
      if ($if_let_value != undefined) {
        const truth = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: truth")})(truth)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = ((((jsonElements)?.["strings"])?.["non"])?.["existant"])?.["element"];
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $if_let_value = (((jsonElements)?.["cant"])?.[1000])?.[42];
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const notSpecified = ({"foo": "bar"});
    {((cond) => {if (!cond) throw new Error("assertion failed: notSpecified.get(\"foo\") == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(notSpecified, "foo"),"bar")))};
    const empty = ({});
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(empty, \"something\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([empty, "something"]),false)))};
    const arrayStruct = [({"foo": "","stuff": []})];
    const setStruct = new Set([({"foo": "","stuff": []})]);
    const mapStruct = ({"1": ({"foo": "","stuff": []})});
    const deepCollectionStruct = ({"1": [new Set([({"foo": "","stuff": []})])]});
    const notJsonMissingField = ({"foo": "bar","stuff": []});
    const notJson = ({"foo": "bar","stuff": [1, 2, 3],"maybe": ({"good": true,"inner_stuff": [({"hi": 1,"base": "base"})]})});
    let mutableJson = ({"foo": "bar","stuff": [1, 2, 3],"maybe": ({"good": true,"inner_stuff": [({"hi": 1,"base": "base"})]})});
    const hasBucket = ({"a": ({"a": this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket")})});
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

