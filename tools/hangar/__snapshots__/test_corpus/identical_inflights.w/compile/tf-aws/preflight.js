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

class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    const x = new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.8eb95bcbc154530931e15fc418c8b1fe991095671409552099ea1aa596999ede/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
});
    const y = new $stdlib.core.Inflight(this, "$Inflight2", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.8eb95bcbc154530931e15fc418c8b1fe991095671409552099ea1aa596999ede/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
});
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "identical_inflights", plugins: $plugins, isTestEnvironment: $wing_is_test });
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