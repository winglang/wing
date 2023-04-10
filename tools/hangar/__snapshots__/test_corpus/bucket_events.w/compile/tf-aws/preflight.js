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
    const other = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"other");
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b");
    (b.onDelete(new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.e0895e35017839af19c4cdf5e5752ce00b8bee3a6425933fc1349d037cf9ed23/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
})));
    (b.onUpdate(new $stdlib.core.Inflight(this, "$Inflight2", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.4c20a426ba35d2bc9530ee9673d6111365502af4b9943b5993189fef4c9cbb24/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
})));
    (b.onCreate(new $stdlib.core.Inflight(this, "$Inflight3", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.fea0ccbdf726c314d7bdccef2e9a3af2667b14bbf90b08535bc3b8531676a5f7/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
})));
    (b.onEvent(new $stdlib.core.Inflight(this, "$Inflight4", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.dbe235d917909459004bd5b4ee5f5c116451dd314d6afb668f81aca7412c951c/index.js".replace(/\\/g, "/"))),
  bindings: {
    other: {
      obj: other,
      ops: ["delete","get","get_json","list","public_url","put","put_json"]
    },
  }
})));
    (other.onEvent(new $stdlib.core.Inflight(this, "$Inflight5", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.1077abc4fd9d2c1dcaf67fa6bfcd127520e9da3f7cb638866ee99e8ac058bb04/index.js".replace(/\\/g, "/"))),
  bindings: {
  }
})));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight6", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.bd899ae09cdb75ce681c2be5132db5f8fbc54bd45d0a438077f48809708c05a6/index.js".replace(/\\/g, "/"))),
  bindings: {
    b: {
      obj: b,
      ops: ["delete","get","get_json","list","public_url","put","put_json"]
    },
  }
}));
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bucket_events", plugins: $plugins, isTestEnvironment: $wing_is_test });
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