# [impl_interface.w](../../../../examples/tests/valid/impl_interface.w) | compile | tf-aws

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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._inflightOps.push("handle");
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            class  A {
              constructor({ stateful }) {
                this.stateful = stateful;
              }
              async handle(msg)  {
                {
                  return;
                }
              }
            }
            const tmp = new A({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class r extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._inflightOps.push("method_2");
      }
       method_1(x)  {
        {
          return x;
        }
      }
       method_3(x)  {
        {
          return x;
        }
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            class  r {
              constructor({ stateful }) {
                this.stateful = stateful;
              }
              async method_2(x)  {
                {
                  return x;
                }
              }
            }
            const tmp = new r({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("method_2")) {
        }
        super._registerBind(host, ops);
      }
    }
    class Dog extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._inflightOps.push("eat");
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            class  Dog {
              constructor({ stateful }) {
                this.stateful = stateful;
              }
              async eat()  {
                {
                  return;
                }
              }
            }
            const tmp = new Dog({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("eat")) {
        }
        super._registerBind(host, ops);
      }
    }
    const x = new A(this,"A");
    const y = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        x: {
          obj: x,
          ops: []
        },
      }
    })
    ;
    const z = new Dog(this,"Dog");
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "impl_interface", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc1/index.js
```js
async handle() {
  const { x } = this;
  (await x.handle("hello world!"));
}

```

