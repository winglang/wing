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
    if (true) {
      const x = 2;
      const f = false;
      if ((true && ((x + 2) === 4))) {
        if ((true && ((x + 3) === 4))) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
        }
        else if ((true && ((x + 3) === 6))) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
        }
        else if ((false || ((x + 3) === 5))) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'true'`)})(true)};
        }
        else if ((!f)) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(!(!f)))'`)})((!(!(!f))))};
        }
        else {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
        }
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
    }
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.ab279327be755396ddd6a86db98293e7b609ca1f861184371a84a7d4cd59487b/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "statements_if", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
