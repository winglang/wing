# [impl_interface.w](../../../../examples/tests/valid/impl_interface.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ x }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        (await x.handle("hello world!"));
      }
    }
  }
  return $Inflight1;
}

```

## clients/A.inflight.js
```js
module.exports = function({  }) {
  class  A {
    constructor({  }) {
    }
    async handle(msg)  {
      {
        const __parent_this = this;
        return;
      }
    }
  }
  return A;
}

```

## clients/Dog.inflight.js
```js
module.exports = function({  }) {
  class  Dog {
    constructor({  }) {
    }
    async eat()  {
      {
        const __parent_this = this;
        return;
      }
    }
  }
  return Dog;
}

```

## clients/r.inflight.js
```js
module.exports = function({  }) {
  class  r {
    constructor({  }) {
    }
    async method2(x)  {
      {
        const __parent_this = this;
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
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AClient = ${A._toInflightType(this).text};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
       _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        const x_client = context._lift(x);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            x: ${x_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
       _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(x, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    class r extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("method2");
        const __parent_this = this;
      }
       method1(x)  {
        {
          const __parent_this = this;
          return x;
        }
      }
       method3(x)  {
        {
          const __parent_this = this;
          return x;
        }
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/r.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const rClient = ${r._toInflightType(this).text};
            const client = new rClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
       _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("method2")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    class Dog extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("eat");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Dog.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const DogClient = ${Dog._toInflightType(this).text};
            const client = new DogClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
       _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("eat")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    const x = new A(this,"A");
    const y = new $Inflight1(this,"$Inflight1");
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

