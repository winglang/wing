# [json.w](../../../../../examples/tests/valid/json.w) | compile | tf-aws

## clients/Foo.inflight.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ SumStr }) {
      this.SumStr = SumStr;
    }
    async $inflight_init()  {
      const __parent_this = this;
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
      "version": "0.15.2"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.SumStr = "wow!";
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Foo.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const SumStr_client = this._lift(this.SumStr);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
              SumStr: ${SumStr_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(this.SumStr, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const jsonNumber = 123;
    const jsonBool = true;
    const jsonArray = [1, 2, 3];
    const jsonObj = Object.freeze({"boom":123});
    const jsonMutObj = {"hello":123,"world":[1, "cat", 3],"boom boom":{"hello":1233}};
    const message = "Coolness";
    ((obj, args) => { obj[args[0]] = args[1]; })(jsonMutObj, ["hello",message]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((jsonMutObj)["hello"] === message)'`)})(((jsonMutObj)["hello"] === message))};
    const someNumber = 999;
    const jj = someNumber;
    const jj1 = Object.freeze({"foo":someNumber});
    const jj2 = [someNumber, {"bar":someNumber}];
    const getStr =  () =>  {
      return "hello";
    }
    ;
    const jj3 = (getStr());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(jj3 === "hello")'`)})((jj3 === "hello"))};
    const f = new Foo(this,"Foo");
    const jj4 = f.SumStr;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(jj4 === "wow!")'`)})((jj4 === "wow!"))};
    const someJson = {"x":someNumber};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((someJson)["x"] === someNumber)'`)})(((someJson)["x"] === someNumber))};
    ((obj, args) => { obj[args[0]] = args[1]; })(someJson, ["x",111]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((someJson)["x"] === 111)'`)})(((someJson)["x"] === 111))};
    const x = Object.freeze({"cool":"beans"});
    const nestedJson = {"a":"hello","b":{"c":"world","d":{"foo":"foo","bar":123}}};
    ((obj, args) => { obj[args[0]] = args[1]; })(((nestedJson)["b"])["d"], ["foo","tastic"]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((((nestedJson)["b"])["d"])["foo"] === "tastic")'`)})(((((nestedJson)["b"])["d"])["foo"] === "tastic"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((((nestedJson)["b"])["d"])["bar"] === 123)'`)})(((((nestedJson)["b"])["d"])["bar"] === 123))};
    const b = "buckle";
    const arr = [1, 2, b, "my", "shoe", 3, 4, ["shut", "the", "door"]];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr)[0] === 1)'`)})(((arr)[0] === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr)[2] === b)'`)})(((arr)[2] === b))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((arr)[7])[0] === "shut")'`)})((((arr)[7])[0] === "shut"))};
    Object.freeze({"a":[1, 2, "world"],"b":[1, 2, "world"]});
    const emptyJson = Object.freeze({});
    const emptyJsonArr = [];
    const emptyMutJson = {};
    const emptyMutJsonArr = [];
    ((obj, args) => { obj[args[0]] = args[1]; })(emptyMutJson, ["cool",{"a":1,"b":2}]);
    ((obj, args) => { obj[args[0]] = args[1]; })((emptyMutJson)["cool"], ["a",3]);
    ((obj, args) => { obj[args[0]] = args[1]; })(emptyMutJsonArr, [0,{"a":1,"b":2}]);
    ((obj, args) => { obj[args[0]] = args[1]; })((emptyMutJsonArr)[0], ["a",3]);
    const theTowerOfJson = {"a":{},"b":{"c":{},"d":[[[{}]]]},"e":{"f":{"g":{},"h":[{}, []]}}};
    ((obj, args) => { obj[args[0]] = args[1]; })(((((theTowerOfJson)["e"])["f"])["h"])[0], ["a",1]);
    const thatSuperNestedValue = (((((theTowerOfJson)["e"])["f"])["h"])[0])["a"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(thatSuperNestedValue) === 1)'`)})((((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(thatSuperNestedValue) === 1))};
    const unestedJsonArr = [1, 2, 3];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((unestedJsonArr)[0] === 1)'`)})(((unestedJsonArr)[0] === 1))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "json", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

