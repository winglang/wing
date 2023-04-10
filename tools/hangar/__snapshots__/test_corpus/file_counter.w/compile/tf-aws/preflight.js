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
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 100 });
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue",{ timeout: $stdlib.std.Duration.fromSeconds(10) });
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.1ece6a476239c44d64d8b687b9e4389715198c49564defb8766e8b85b0f54620/index.js".replace(/\\/g, "/"))),
  bindings: {
    bucket: {
      obj: bucket,
      ops: ["delete","get","get_json","list","public_url","put","put_json"]
    },
    counter: {
      obj: counter,
      ops: ["dec","inc","peek","reset"]
    },
  }
});
    (queue.addConsumer(handler));
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "file_counter", plugins: $plugins, isTestEnvironment: $wing_is_test });
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