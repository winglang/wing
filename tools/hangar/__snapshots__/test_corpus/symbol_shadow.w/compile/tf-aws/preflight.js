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
    class A extends $stdlib.core.Resource {
	constructor(scope, id, ) {
	super(scope, id);
{
  const s = "in_resource";
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "in_resource")'`)})((s === "in_resource"))};
  this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight in resource should capture the right scoped var",new $stdlib.core.Inflight(this, "$Inflight1", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.8da45132c1b6dfa15702b3431ec3c8a45d068e4170f3a4b3283f5fc13f7a0a23/index.js".replace(/\\/g, "/"))),
    bindings: {
      s: {
        obj: s,
        ops: []
      },
    }
  }));
}
}
	
	_toInflight() {
	
	const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).A({}))`);
}
}
A._annotateInflight("$init", {});
    const s = "top";
    if (true) {
  const s = "inner";
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inner")'`)})((s === "inner"))};
  this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight nested should not capture the shadowed var",new $stdlib.core.Inflight(this, "$Inflight2", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.cb5d71e68f43465f5d19d7f088bcec25b88020553caf1d69c04d5ca4ed5d207f/index.js".replace(/\\/g, "/"))),
    bindings: {
      s: {
        obj: s,
        ops: []
      },
    }
  }));
}
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "top")'`)})((s === "top"))};
    new A(this,"A");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight on top should capture top",new $stdlib.core.Inflight(this, "$Inflight3", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.62da13ae32a0ac59873b38f570f2c36bb56acdf4cbc8c53bf38c5e409025bb02/index.js".replace(/\\/g, "/"))),
  bindings: {
    s: {
      obj: s,
      ops: []
    },
  }
}));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inside_inflight should capture the right scope",new $stdlib.core.Inflight(this, "$Inflight4", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.58071421b869be15b2d199413c5dc715991c0a650cffd6235b0a0cbf57c1e4dd/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
}));
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "symbol_shadow", plugins: $plugins, isTestEnvironment: $wing_is_test });
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