# [json.w](../../../../../examples/tests/valid/json.w) | compile | tf-aws

## inflight.Foo-fb3e3ced.js
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
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.SumStr = "wow!";
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo-fb3e3ced.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

