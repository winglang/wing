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
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.09dcc4ff0890e102805bbc51ef3934c08d91e5bf84395afde5497f34df87a7d8/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ));
    (b.onUpdate(new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.cdae347b8886baf52a55404c418d32d00e90df41124134b320bfa397a5f74c25/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ));
    (b.onCreate(new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.cf448bce60320955625b8e5174094d9799f236443e940587740acf6da94eed75/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ));
    (b.onEvent(new $stdlib.core.Inflight(this, "$Inflight4", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.a726467156eb8c271f9225b3e17be8de6d6c17a49aaa65da842e2f7d6bdaf896/index.js".replace(/\\/g, "/"))),
      bindings: {
        other: {
          obj: other,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
      }
    })
    ));
    (other.onEvent(new $stdlib.core.Inflight(this, "$Inflight5", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.fca059c479747295eb7f36bfd8dcd61c2e15d4b53e0aca4acb4cdea062e4b3a3/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight6", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.44ffe304e2ab76a8326d652a552eab6dfaadac1194df65fecf28d7c384a8cc13/index.js".replace(/\\/g, "/"))),
      bindings: {
        b: {
          obj: b,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
      }
    })
    );
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
