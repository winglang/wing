# [structs.w](../../../../../examples/tests/valid/structs.w) | compile | tf-aws

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ $this_data_field0 }) {
      this.$this_data_field0 = $this_data_field0;
    }
    async getStuff() {
      return this.$this_data_field0;
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, b) {
        super(scope, id);
        this._addInflightOps("getStuff", "$inflight_init");
        this.data = b;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
              $this_data_field0: ${this._lift(this.data.field0)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(this.data.field0, host, []);
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
    {((cond) => {if (!cond) throw new Error("assertion failed: x.field0 == \"Sup\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x.field0,"Sup")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: y.field1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y.field1,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: y.field3.field0 == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y.field3.field0,"foo")))};
    const s = {
    "a": "Boom baby",}
    ;
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "structs", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

