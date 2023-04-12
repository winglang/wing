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
        this.field = "hey";
      }
      _toInflight() {
        const field_client = this._lift(this.field);
        const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (new (require("${self_client_path}")).A({
            field: ${field_client},
          }))
        `);
      }
    }
    A._annotateInflight("$init", {"this.field": { ops: [] }});
    const a = new A(this,"A");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.81f22ed577c606e2abb5d01ab149b86464b35ffade7551b81842daccdbf2fb3e/index.js".replace(/\\/g, "/"))),
      bindings: {
        a: {
          obj: a,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_resource_with_no_inflight", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
