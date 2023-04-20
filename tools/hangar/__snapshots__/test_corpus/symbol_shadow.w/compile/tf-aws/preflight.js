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
        const s = "in_resource";
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "in_resource")'`)})((s === "in_resource"))};
        this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight in resource should capture the right scoped var",new $stdlib.core.Inflight(this, "$Inflight1", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
          bindings: {
            s: {
              obj: s,
              ops: []
            },
          }
        })
        );
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).A({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    A._annotateInflight("$inflight_init", {"this.stateful": { ops: [] }});
    const s = "top";
    if (true) {
      const s = "inner";
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inner")'`)})((s === "inner"))};
      this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight nested should not capture the shadowed var",new $stdlib.core.Inflight(this, "$Inflight2", {
        code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
        bindings: {
          s: {
            obj: s,
            ops: []
          },
        }
      })
      );
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "top")'`)})((s === "top"))};
    new A(this,"A");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight on top should capture top",new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
      bindings: {
        s: {
          obj: s,
          ops: []
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inside_inflight should capture the right scope",new $stdlib.core.Inflight(this, "$Inflight4", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc4/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "symbol_shadow", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
