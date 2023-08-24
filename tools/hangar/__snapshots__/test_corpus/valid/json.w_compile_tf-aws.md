# [json.w](../../../../../examples/tests/valid/json.w) | compile | tf-aws

## Base.Struct.js
```js
module.exports = function(stdStruct) {
  class Base {
    static jsonSchema() {
      return {
        id: "/Base",
        type: "object",
        properties: {
          base: { type: "string" },
        },
        required: [
          "base",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Base.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Base;
};

```

## HasBucket.Struct.js
```js
module.exports = function(stdStruct) {
  class HasBucket {
    static jsonSchema() {
      return {
        id: "/HasBucket",
        type: "object",
        properties: {
          a: { "$ref": "#/$defs/cloud" },
        },
        required: [
          "a",
        ],
        $defs: {
          "cloud": { type: "object", "properties": require("./cloud.Struct.js")().jsonSchema().properties },
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./HasBucket.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return HasBucket;
};

```

## HasInnerBucket.Struct.js
```js
module.exports = function(stdStruct) {
  class HasInnerBucket {
    static jsonSchema() {
      return {
        id: "/HasInnerBucket",
        type: "object",
        properties: {
          a: { "$ref": "#/$defs/HasBucket" },
        },
        required: [
          "a",
        ],
        $defs: {
          "HasBucket": { type: "object", "properties": require("./HasBucket.Struct.js")().jsonSchema().properties },
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./HasInnerBucket.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return HasInnerBucket;
};

```

## InnerStructyJson.Struct.js
```js
module.exports = function(stdStruct) {
  class InnerStructyJson {
    static jsonSchema() {
      return {
        id: "/InnerStructyJson",
        type: "object",
        properties: {
          good: { type: "boolean" },
          inner_stuff: { type: "array",  items: { "$ref": "#/$defs/LastOne" } },
        },
        required: [
          "good",
          "inner_stuff",
        ],
        $defs: {
          "LastOne": { type: "object", "properties": require("./LastOne.Struct.js")().jsonSchema().properties },
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./InnerStructyJson.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return InnerStructyJson;
};

```

## LastOne.Struct.js
```js
module.exports = function(stdStruct) {
  class LastOne {
    static jsonSchema() {
      return {
        id: "/LastOne",
        type: "object",
        properties: {
          ...require("./Base.Struct.js")().jsonSchema().properties,
          hi: { type: "number" },
        },
        required: [
          "hi",
          ...require("./Base.Struct.js")().jsonSchema().required,
        ],
        $defs: {
          ...require("./Base.Struct.js")().jsonSchema().$defs,
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./LastOne.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return LastOne;
};

```

## StructyJson.Struct.js
```js
module.exports = function(stdStruct) {
  class StructyJson {
    static jsonSchema() {
      return {
        id: "/StructyJson",
        type: "object",
        properties: {
          foo: { type: "string" },
          stuff: { type: "array",  items: { type: "number" } },
          maybe: { "$ref": "#/$defs/InnerStructyJson" },
        },
        required: [
          "foo",
          "stuff",
        ],
        $defs: {
          "InnerStructyJson": { type: "object", "properties": require("./InnerStructyJson.Struct.js")().jsonSchema().properties },
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./StructyJson.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return StructyJson;
};

```

## inflight.Foo-1.js
```js
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
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
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "cloudBucket_Encryption_77B6AEEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "cloudBucket_Encryption_77B6AEEF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
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
      _getInflightOps() {
        return ["$inflight_init"];
      }
    }
    const jsonNumber = 123;
    const jsonBool = true;
    const jsonArray = [1, 2, 3];
    const jsonObj = ({"boom": 123});
    const jsonMutObj = ({"hello": 123,"world": [1, "cat", 3],"boom boom": ({"hello": 1233})});
    const message = "Coolness";
    ((obj, args) => { obj[args[0]] = args[1]; })(jsonMutObj, ["hello",message]);
    {((cond) => {if (!cond) throw new Error("assertion failed: jsonMutObj.get(\"hello\") == message")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((jsonMutObj)["hello"],message)))};
    const someNumber = 999;
    const jj = someNumber;
    const jj1 = ({"foo": someNumber});
    const jj2 = [someNumber, ({"bar": someNumber})];
    const getStr = (() => {
      return "hello";
    });
    const jj3 = (getStr());
    {((cond) => {if (!cond) throw new Error("assertion failed: jj3 == Json \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(jj3,"hello")))};
    const f = new Foo(this,"Foo");
    const jj4 = f.SumStr;
    {((cond) => {if (!cond) throw new Error("assertion failed: jj4 == Json \"wow!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(jj4,"wow!")))};
    const someJson = ({"x": someNumber});
    {((cond) => {if (!cond) throw new Error("assertion failed: someJson.get(\"x\") == someNumber")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((someJson)["x"],someNumber)))};
    ((obj, args) => { obj[args[0]] = args[1]; })(someJson, ["x",111]);
    {((cond) => {if (!cond) throw new Error("assertion failed: someJson.get(\"x\") == 111")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((someJson)["x"],111)))};
    const x = ({"cool": "beans"});
    const nestedJson = ({"a": "hello","b": ({"c": "world","d": ({"foo": "foo","bar": 123})})});
    ((obj, args) => { obj[args[0]] = args[1]; })(((nestedJson)["b"])["d"], ["foo","tastic"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: nestedJson.get(\"b\").get(\"d\").get(\"foo\") == \"tastic\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((nestedJson)["b"])["d"])["foo"],"tastic")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: nestedJson.get(\"b\").get(\"d\").get(\"bar\") == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((nestedJson)["b"])["d"])["bar"],123)))};
    const b = "buckle";
    const arr = [1, 2, b, "my", "shoe", 3, 4, ["shut", "the", "door"]];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr.getAt(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr)[0],1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr.getAt(2) == b")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr)[2],b)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr.getAt(7).getAt(0) == \"shut\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr)[7])[0],"shut")))};
    ({"a": [1, 2, "world"],"b": [1, 2, "world"]});
    const emptyJson = ({});
    const emptyJsonArr = [];
    const emptyMutJson = ({});
    const emptyMutJsonArr = [];
    ((obj, args) => { obj[args[0]] = args[1]; })(emptyMutJson, ["cool",({"a": 1,"b": 2})]);
    ((obj, args) => { obj[args[0]] = args[1]; })((emptyMutJson)["cool"], ["a",3]);
    ((obj, args) => { obj[args[0]] = args[1]; })(emptyMutJsonArr, [0,({"a": 1,"b": 2})]);
    ((obj, args) => { obj[args[0]] = args[1]; })((emptyMutJsonArr)[0], ["a",3]);
    const theTowerOfJson = ({"a": ({}),"b": ({"c": ({}),"d": [[[({})]]]}),"e": ({"f": ({"g": ({}),"h": [({}), []]})})});
    ((obj, args) => { obj[args[0]] = args[1]; })(((((theTowerOfJson)["e"])["f"])["h"])[0], ["a",1]);
    const thatSuperNestedValue = (((((theTowerOfJson)["e"])["f"])["h"])[0])["a"];
    {((cond) => {if (!cond) throw new Error("assertion failed: num.fromJson(thatSuperNestedValue) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(thatSuperNestedValue),1)))};
    const unestedJsonArr = [1, 2, 3];
    {((cond) => {if (!cond) throw new Error("assertion failed: unestedJsonArr.getAt(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((unestedJsonArr)[0],1)))};
    const jsonElements = ({"strings": ({"single": "Hello","array": ["Hello", "World", "!"]}),"numbers": ({"one": 1,"two": 2,"three": 3}),"bools": ({"t": true,"f": false})});
    {
      const $IF_LET_VALUE = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((jsonElements)?.["strings"])?.["single"]);
      if ($IF_LET_VALUE != undefined) {
        const val = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: val == \"Hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(val,"Hello")))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $IF_LET_VALUE = ((jsonElements)?.["strings"])?.["array"];
      if ($IF_LET_VALUE != undefined) {
        const vals = $IF_LET_VALUE;
        {
          const $IF_LET_VALUE = (vals)?.[0];
          if ($IF_LET_VALUE != undefined) {
            const hello = $IF_LET_VALUE;
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
      const $IF_LET_VALUE = ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })(((jsonElements)?.["numbers"])?.["two"]);
      if ($IF_LET_VALUE != undefined) {
        const two = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: two + 2 == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((two + 2),4)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $IF_LET_VALUE = ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })(((jsonElements)?.["bools"])?.["t"]);
      if ($IF_LET_VALUE != undefined) {
        const truth = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: truth")})(truth)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $IF_LET_VALUE = ((((jsonElements)?.["strings"])?.["non"])?.["existant"])?.["element"];
      if ($IF_LET_VALUE != undefined) {
        const val = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    {
      const $IF_LET_VALUE = (((jsonElements)?.["cant"])?.[1000])?.[42];
      if ($IF_LET_VALUE != undefined) {
        const val = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const notSpecified = ({"foo": "bar"});
    {((cond) => {if (!cond) throw new Error("assertion failed: notSpecified.get(\"foo\") == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((notSpecified)["foo"],"bar")))};
    const empty = ({});
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(empty, \"something\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([empty,"something"]),false)))};
    const Base = require("./Base.Struct.js")($stdlib.std.Struct);
    const LastOne = require("./LastOne.Struct.js")($stdlib.std.Struct);
    const InnerStructyJson = require("./InnerStructyJson.Struct.js")($stdlib.std.Struct);
    const StructyJson = require("./StructyJson.Struct.js")($stdlib.std.Struct);
    const notJsonMissingField = ({"foo": "bar","stuff": []});
    const notJson = ({"foo": "bar","stuff": [1, 2, 3],"maybe": ({"good": true,"inner_stuff": [({"hi": 1,"base": "base"})]})});
    let mutableJson = ({"foo": "bar","stuff": [1, 2, 3],"maybe": ({"good": true,"inner_stuff": [({"hi": 1,"base": "base"})]})});
    const HasBucket = require("./HasBucket.Struct.js")($stdlib.std.Struct);
    const HasInnerBucket = require("./HasInnerBucket.Struct.js")($stdlib.std.Struct);
    const hasBucket = ({"a": ({"a": this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket")})});
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

