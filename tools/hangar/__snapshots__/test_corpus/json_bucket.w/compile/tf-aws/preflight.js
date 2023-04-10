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
    const file_name = "file.json";
    const j = Object.freeze({"persons":[{"age":30,"name":"hasan","fears":["heights", "failure"]}]});
    const get_json = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.1dabd42192b8d28a57f44a84b644a18eb6fedb868257af123181c0ecec2c2a70/index.js".replace(/\\/g, "/"))),
  bindings: {
    b: {
      obj: b,
      ops: ["delete","get","get_json","list","public_url","put","put_json"]
    },
    file_name: {
      obj: file_name,
      ops: []
    },
  }
}));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:put",new $stdlib.core.Inflight(this, "$Inflight2", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.742d4f24b17fb7f7f831acbd15487b30d36ad90d44229b79672a09f910cb6619/index.js".replace(/\\/g, "/"))),
  bindings: {
    b: {
      obj: b,
      ops: ["delete","get","get_json","list","public_url","put","put_json"]
    },
    file_name: {
      obj: file_name,
      ops: []
    },
    get_json: {
      obj: get_json,
      ops: ["invoke"]
    },
    j: {
      obj: j,
      ops: []
    },
  }
}));
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "json_bucket", plugins: $plugins, isTestEnvironment: $wing_is_test });
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