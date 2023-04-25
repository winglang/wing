# [structs.w](../../../../examples/tests/valid/structs.w) | compile | tf-aws

## clients/Foo.inflight.js
```js
class  Foo {
  constructor({ data, stateful }) {
    this.data = data;
    this.stateful = stateful;
  }
  async get_stuff()  {
    {
      return this.data.field0;
    }
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
      constructor(scope, id, b) {
        super(scope, id);
        this.data = b;
      }
      _toInflight() {
        const data_client = this._lift(this.data);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Foo({
              data: ${data_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Foo._annotateInflight("$inflight_init", {"this.data": { ops: [] },"this.stateful": { ops: [] }});
    Foo._annotateInflight("get_stuff", {"this.data.field0": { ops: [] }});
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

