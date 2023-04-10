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
    const arr = Object.freeze(["hello", "world"]);
    const my_set = Object.freeze(new Set(["my", "my", "set"]));
    const my_map = Object.freeze({"hello":123,"world":999});
    const arr_of_map = Object.freeze([Object.freeze({"bang":123})]);
    const j = Object.freeze({"a":"hello","b":"world"});
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.dc7e5dc23da309970778fe7db4c795e3a6ae63c0d0ddc5e1780d4e2daadf67e1/index.js".replace(/\\/g, "/"))),
  bindings: {
    arr: {
      obj: arr,
      ops: []
    },
    arr_of_map: {
      obj: arr_of_map,
      ops: []
    },
    j: {
      obj: j,
      ops: []
    },
    my_map: {
      obj: my_map,
      ops: []
    },
    my_set: {
      obj: my_set,
      ops: []
    },
  }
});
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",handler);
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_containers", plugins: $plugins, isTestEnvironment: $wing_is_test });
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