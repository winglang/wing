# [structs.w](../../../../../examples/tests/valid/structs.w) | compile | tf-aws

## clients/Foo.inflight.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ data }) {
      this.data = data;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async getStuff()  {
      const __parent_this = this;
      return this.data.field0;
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
      constructor(scope, id, b) {
        super(scope, id);
        this._addInflightOps("getStuff");
        const __parent_this = this;
        this.data = b;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Foo.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const data_client = this._lift(this.data);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
              data: ${data_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(this.data, host, []);
        }
        if (ops.includes("getStuff")) {
          Foo._registerBindObject(this.data.field0, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const x = {
    "field0": "Sup",}
    ;
    const y = {
    "field0": "hello",
    "field1": 1,
    "field2": "world",
    "field3": {
    "field0": "foo",}
    ,}
    ;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x.field0 === "Sup")'`)})((x.field0 === "Sup"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y.field1 === 1)'`)})((y.field1 === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y.field3.field0 === "foo")'`)})((y.field3.field0 === "foo"))};
    const s = {
    "a": "Boom baby",}
    ;
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "structs", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

