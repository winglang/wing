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
{
}
}
	static get_greeting(name)  {
	return (require(require.resolve("./external_js.js", {paths: [process.env.WING_PROJECT_DIR]}))["get_greeting"])(name)
}
static v4()  {
	return (require(require.resolve("uuid", {paths: [process.env.WING_PROJECT_DIR]}))["v4"])()
}
	_toInflight() {
	
	const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).Foo({}))`);
}
}
Foo._annotateInflight("regex_inflight", {});
Foo._annotateInflight("get_uuid", {});
Foo._annotateInflight("get_data", {});
Foo._annotateInflight("call", {});
Foo._annotateInflight("$init", {});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.get_greeting("Wingding")) === "Hello, Wingding!")'`)})(((Foo.get_greeting("Wingding")) === "Hello, Wingding!"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.v4()).length === 36)'`)})(((Foo.v4()).length === 36))};
    const f = new Foo(this,"Foo");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:call",new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.07843d13880528eb093c8438f86267f529c160bc2f048435d6f2c77a50053a5c/index.js".replace(/\\/g, "/"))),
  bindings: {
    f: {
      obj: f,
      ops: ["call","get_data","get_uuid","regex_inflight"]
    },
  }
}));
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "extern_implementation", plugins: $plugins, isTestEnvironment: $wing_is_test });
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