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
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:put",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.412efe1236e70dc0c84a7db92a612d4405b678740d6d9a86f75c2c059a93e1b3/index.js".replace(/\\/g, "/"))),
      bindings: {
        b: {
          obj: b,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:get",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.ac9708184e710f892c66bb4336569769a09d726ccc04b8ee83036b184d5bb763/index.js".replace(/\\/g, "/"))),
      bindings: {
        b: {
          obj: b,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "test_bucket", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
