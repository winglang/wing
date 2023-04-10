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
    {console.log("preflight log")};
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:log1",new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.bf0feaf1bc98afc8eb1ba94d506b4dcd46af0da756a1a665f0e03f5a75b63422/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
}));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:log2",new $stdlib.core.Inflight(this, "$Inflight2", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.71a8edefcd0491d59b2cec2c14ce38019ce88de4e579784cec3340cc2e5a7d2d/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
}));
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "print", plugins: $plugins, isTestEnvironment: $wing_is_test });
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