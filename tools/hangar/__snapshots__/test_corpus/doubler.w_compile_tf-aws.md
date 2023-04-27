# [doubler.w](../../../../examples/tests/valid/doubler.w) | compile | tf-aws

## clients/Doubler.inflight.js
```js
class  Doubler {
  constructor({ func, stateful }) {
    this.func = func;
    this.stateful = stateful;
  }
  async invoke(message)  {
    {
      (await this.func.handle(message));
      (await this.func.handle(message));
    }
  }
}
exports.Doubler = Doubler;
exports.setupGlobals = function(globals) {
};

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
    class Doubler extends $stdlib.std.Resource {
      constructor(scope, id, func) {
        super(scope, id);
        this._addInflightOps("invoke");
        this.func = func;
      }
      _toInflight() {
        const func_client = this._lift(this.func);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Doubler.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const mod = require("${self_client_path}")
            const client = new mod.Doubler({
              func: ${func_client},
              stateful: ${stateful_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.func, host, []);
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("invoke")) {
          this._registerBindObject(this.func, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const fn = new Doubler(this,"Doubler",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "doubler", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle(m) {
  const {  } = this;
  return `Hello ${m}!`;
}

```

