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
    class Doubler extends $stdlib.core.Resource {
      constructor(scope, id, func) {
        super(scope, id);
        this.func = func;
      }
      _toInflight() {
        const func_client = this._lift(this.func);
        const self_client_path = "./clients/Doubler.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (new (require("${self_client_path}")).Doubler({
            func: ${func_client},
          }))
        `);
      }
    }
    Doubler._annotateInflight("invoke", {"this.func": { ops: ["handle"] }});
    Doubler._annotateInflight("$init", {"this.func": { ops: [] }});
    const fn = new Doubler(this,"Doubler",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.1eb4781e85032ffc58e74255182bc1fdee5701b5098072dd29f4faf4f591d6aa/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "doubler", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
