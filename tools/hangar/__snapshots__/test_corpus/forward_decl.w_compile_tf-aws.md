# [forward_decl.w](../../../../examples/tests/valid/forward_decl.w) | compile | tf-aws

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

## clients/R.inflight.js
```js
class  R {
  constructor({ f, stateful }) {
    this.f = f;
    this.stateful = stateful;
  }
}
exports.R = R;

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
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/R.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).R({
              f: ${f_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    R._annotateInflight("$inflight_init", {"this.f": { ops: [] },"this.stateful": { ops: [] }});
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

