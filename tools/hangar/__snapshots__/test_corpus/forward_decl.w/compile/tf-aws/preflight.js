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
    class R extends $stdlib.core.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
       method2()  {
        {
          (this.method1());
          {console.log(`${this.f}`)};
          (this.method2());
        }
      }
       method1()  {
        {
        }
      }
      _toInflight() {
        const f_client = this._lift(this.f);
        const self_client_path = "./clients/R.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (new (require("${self_client_path}")).R({
            f: ${f_client},
          }))
        `);
      }
    }
    R._annotateInflight("$init", {"this.f": { ops: [] }});
    const x = "hi";
    if (true) {
      {console.log(`${x}`)};
      const y = new R(this,"R");
    }
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "forward_decl", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
