# [impl_interface.w](../../../../examples/tests/valid/impl_interface.w) | compile | tf-aws

## clients/A.inflight.js
```js
module.exports = function($globals) {
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
  return A;
}

```

## clients/Dog.inflight.js
```js
module.exports = function($globals) {
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
  return Dog;
}

```

## clients/r.inflight.js
```js
module.exports = function($globals) {
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
  return r;
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const A = require("${self_client_path}")({});
            const client = new A({
              stateful: ${stateful_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
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
        this._addInflightOps("method_2");
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
        const self_client_path = "./clients/r.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const r = require("${self_client_path}")({});
            const client = new r({
              stateful: ${stateful_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
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
        this._addInflightOps("eat");
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Dog.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const Dog = require("${self_client_path}")({});
            const client = new Dog({
              stateful: ${stateful_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
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

