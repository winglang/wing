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
    class Foo extends $stdlib.core.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.instance_field = 100;
      }
      static m()  {
        {
          return 99;
        }
      }
      _toInflight() {
        const instance_field_client = this._lift(this.instance_field);
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (new (require("${self_client_path}")).Foo({
            instance_field: ${instance_field_client},
          }))
        `);
      }
    }
    Foo._annotateInflight("get_123", {});
    Foo._annotateInflight("$init", {"this.instance_field": { ops: [] }});
    const foo = new Foo(this,"Foo");
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(foo.instance_field === 100)'`)})((foo.instance_field === 100))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.m()) === 99)'`)})(((Foo.m()) === 99))};
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.9bc2ebe720b1ce33f8961b4d75e64753d2833d1a50029354c9ccba5d429d01f2/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "static_members", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
