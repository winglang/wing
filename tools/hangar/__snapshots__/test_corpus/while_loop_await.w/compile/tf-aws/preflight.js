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
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const iterator = new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.82d0059fdbaebaab6d1be68f497052f9d5b8662f4333952a6e9ad55f564e0c97/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
});
    const handler = new $stdlib.core.Inflight(this, "$Inflight2", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.f259e8d1edc5d47946ec1a1f3aa23e59fe550255ec12b899cffb307ecf525df6/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
});
    (queue.addConsumer(handler));
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "while_loop_await", plugins: $plugins, isTestEnvironment: $wing_is_test });
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