# [forward_decl.w](../../../../examples/tests/valid/forward_decl.w) | compile | tf-aws

## clients/R.inflight.js
```js
module.exports = function() {
  class  R {
    constructor({ f }) {
      this.f = f;
    }
  }
  return R;
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
    class R extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
       method2()  {
        {
          (this.method1());
          {console.log(`${this.f}`)};
          (this.method2());
        }
      }
       method1()  {
        {
        }
      }
      _toInflight() {
        const f_client = this._lift(this.f);
        const self_client_path = "./clients/R.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const R = require("${self_client_path}")({});
            const client = new R({
              f: ${f_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.f, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const x = "hi";
    if (true) {
      {console.log(`${x}`)};
      const y = new R(this,"R");
    }
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "forward_decl", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

