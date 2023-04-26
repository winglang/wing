# [json.w](../../../../examples/tests/valid/json.w) | compile | tf-aws

## clients/Foo.inflight.js
```js
class  Foo {
  constructor({ _sum_str, stateful }) {
    this._sum_str = _sum_str;
    this.stateful = stateful;
  }
}
exports.Foo = Foo;

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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._sum_str = "wow!";
      }
      _toInflight() {
        const _sum_str_client = this._lift(this._sum_str);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Foo({
              _sum_str: ${_sum_str_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this._sum_str, host, []);
          this._registerBindObject(this.stateful, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const json_number = 123;
    const json_bool = true;
    const json_array = [1, 2, 3];
    const json_obj = Object.freeze({"boom":123});
    const json_mut_obj = {"hello":123,"world":[1, "cat", 3],"boom boom":{"hello":1233}};
    const message = "Coolness";
    ((obj, args) => { obj[args[0]] = args[1]; })(json_mut_obj, ["hello",message]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((json_mut_obj)["hello"] === message)'`)})(((json_mut_obj)["hello"] === message))};
    const some_number = 999;
    const jj = some_number;
    const jj1 = Object.freeze({"foo":some_number});
    const jj2 = [some_number, {"bar":some_number}];
    const get_str =  () =>  {
      {
        return "hello";
      }
    }
    ;
    const jj3 = (get_str());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(jj3 === "hello")'`)})((jj3 === "hello"))};
    const f = new Foo(this,"Foo");
    const jj4 = f._sum_str;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(jj4 === "wow!")'`)})((jj4 === "wow!"))};
    const some_json = {"x":some_number};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((some_json)["x"] === some_number)'`)})(((some_json)["x"] === some_number))};
    ((obj, args) => { obj[args[0]] = args[1]; })(some_json, ["x",111]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((some_json)["x"] === 111)'`)})(((some_json)["x"] === 111))};
    const x = Object.freeze({"cool":"beans"});
    const nested_json = {"a":"hello","b":{"c":"world","d":{"foo":"foo","bar":123}}};
    ((obj, args) => { obj[args[0]] = args[1]; })(((nested_json)["b"])["d"], ["foo","tastic"]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((((nested_json)["b"])["d"])["foo"] === "tastic")'`)})(((((nested_json)["b"])["d"])["foo"] === "tastic"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((((nested_json)["b"])["d"])["bar"] === 123)'`)})(((((nested_json)["b"])["d"])["bar"] === 123))};
    const b = "buckle";
    const arr = [1, 2, b, "my", "shoe", 3, 4, ["shut", "the", "door"]];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr)[0] === 1)'`)})(((arr)[0] === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr)[2] === b)'`)})(((arr)[2] === b))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((arr)[7])[0] === "shut")'`)})((((arr)[7])[0] === "shut"))};
    Object.freeze({"a":[1, 2, "world"],"b":[1, 2, "world"]});
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

