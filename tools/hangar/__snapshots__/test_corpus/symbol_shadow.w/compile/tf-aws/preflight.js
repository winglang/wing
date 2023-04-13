const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";

function __app(target) {
	switch (target) {
		case "sim":
			return $stdlib.sim.App;
		case "tfaws":
		case "tf-aws":
			return $stdlib.tfaws.App;
		case "tf-gcp":
			return $stdlib.tfgcp.App;
		case "tf-azure":
			return $stdlib.tfazure.App;
		case "awscdk":
			return $stdlib.awscdk.App;
		default:
			throw new Error(`Unknown WING_TARGET value: "${process.env.WING_TARGET ?? ""}"`);
	}
}
const $AppBase = __app(process.env.WING_TARGET);

const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.core.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const s = "in_resource";
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "in_resource")'`)})((s === "in_resource"))};
        this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight in resource should capture the right scoped var",new $stdlib.core.Inflight(this, "$Inflight1", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.e28eb0e2c84db9ebf39c60f781e33eb71437de9aea3c9e56527b5592b0d7f259/index.js".replace(/\\/g, "/"))),
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
          (new (require("${self_client_path}")).A({
          }))
        `);
      }
    }
    A._annotateInflight("$init", {});
    const s = "top";
    if (true) {
      const s = "inner";
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inner")'`)})((s === "inner"))};
      this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight nested should not capture the shadowed var",new $stdlib.core.Inflight(this, "$Inflight2", {
        code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.df438ca6138f58185d9c29cf9a58e1569a2c82980ef45ec3e718c6491e53bbbd/index.js".replace(/\\/g, "/"))),
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
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.5ebfc1356186fe498d7c77085bf74da82ee2b4cc0d3396d5e240d89a689f5a70/index.js".replace(/\\/g, "/"))),
      bindings: {
        s: {
          obj: s,
          ops: []
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inside_inflight should capture the right scope",new $stdlib.core.Inflight(this, "$Inflight4", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.b1aa79217b40a2b129132f76b7120cde0cb1ecc3a4b68bf48ee31594fa38cc4b/index.js".replace(/\\/g, "/"))),
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
