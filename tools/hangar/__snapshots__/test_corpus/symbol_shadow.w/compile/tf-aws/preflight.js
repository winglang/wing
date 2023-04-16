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
        {((cond) => {if (!cond) throw new Error('assertion failed: "(s === "in_resource")"')})((s === "in_resource"))};
        this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight in resource should capture the right scoped var",new $stdlib.core.Inflight(this, "$Inflight1", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.89de35415639cef15c6383620cab16dd210885cedcd0fb5fd9f657180b27284a/index.js".replace(/\\/g, "/"))),
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
        const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).A({
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    A._annotateInflight("$inflight_init", {});
    const s = "top";
    if (true) {
      const s = "inner";
      {((cond) => {if (!cond) throw new Error('assertion failed: "(s === "inner")"')})((s === "inner"))};
      this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight nested should not capture the shadowed var",new $stdlib.core.Inflight(this, "$Inflight2", {
        code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.3b6d55f53eed9cb7738e3539b7174e499f22e23bbb54ff16b8a13cbe4d6329b8/index.js".replace(/\\/g, "/"))),
        bindings: {
          s: {
            obj: s,
            ops: []
          },
        }
      })
      );
    }
    {((cond) => {if (!cond) throw new Error('assertion failed: "(s === "top")"')})((s === "top"))};
    new A(this,"A");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight on top should capture top",new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.bff6e0433030e48081910677e34c8845adc25b4d6a3ddfa0ef669b3b255304e8/index.js".replace(/\\/g, "/"))),
      bindings: {
        s: {
          obj: s,
          ops: []
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inside_inflight should capture the right scope",new $stdlib.core.Inflight(this, "$Inflight4", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.a1f90fe76a63b8f761a1f5e13768fe897ae52f8af10748a95b1680567c29a055/index.js".replace(/\\/g, "/"))),
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
