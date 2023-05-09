# [class.w](../../../../examples/tests/valid/class.w) | compile | tf-aws

## clients/C1.inflight.js
```js
module.exports = function() {
  class  C1 {
    constructor({  }) {
    }
  }
  return C1;
}

```

## clients/C2.inflight.js
```js
module.exports = function() {
  class  C2 {
    constructor({ x }) {
      this.x = x;
    }
  }
  return C2;
}

```

## clients/C3.inflight.js
```js
module.exports = function() {
  class  C3 {
    constructor({ x, y }) {
      this.x = x;
      this.y = y;
    }
  }
  return C3;
}

```

## clients/C4.inflight.js
```js
module.exports = function() {
  class  C4 {
    constructor({  }) {
    }
  }
  return C4;
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class C1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
      }
      _toInflight() {
        const self_client_path = "./clients/C1.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C1 = require("${self_client_path}")({});
            const client = new C1({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    class C2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.x = 1;
      }
      _toInflight() {
        const x_client = this._lift(this.x);
        const self_client_path = "./clients/C2.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C2 = require("${self_client_path}")({});
            const client = new C2({
              x: ${x_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.x, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class C3 extends $stdlib.std.Resource {
      constructor(scope, id, a, b) {
        super(scope, id);
        const __parent_this = this;
        this.x = a;
        if (true) {
          const __parent_this = this;
          this.y = b;
        }
      }
      _toInflight() {
        const x_client = this._lift(this.x);
        const y_client = this._lift(this.y);
        const self_client_path = "./clients/C3.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C3 = require("${self_client_path}")({});
            const client = new C3({
              x: ${x_client},
              y: ${y_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.x, host, []);
          this._registerBindObject(this.y, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class C4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("y");
        const __parent_this = this;
      }
      static m()  {
        {
          return 1;
        }
      }
      _toInflight() {
        const self_client_path = "./clients/C4.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C4 = require("${self_client_path}")({});
            const client = new C4({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    new C1(this,"C1");
    const c2 = new C2(this,"C2");
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c2.x === 1)'`)})((c2.x === 1))};
    const c3 = new C3(this,"C3",1,2);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c3.x === 1)'`)})((c3.x === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c3.y === 2)'`)})((c3.y === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((C4.m()) === 1)'`)})(((C4.m()) === 1))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "class", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

