const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";

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
		default:
			throw new Error(`Unknown WING_TARGET value: "${process.env.WING_TARGET ?? ""}"`);
	}
}
const $App = __app(process.env.WING_TARGET);

const cloud = require('@winglang/sdk').cloud;
class MyApp extends $App {
constructor() {
  super({ outdir: $outdir, name: "index", plugins: $plugins });
  
  const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
  const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
  const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.1e88df0487af3262065ce45cdd16cb812d6fe0044efbc0c1a2e268f55e015b33/index.js".replace(/\\/g, "/"))),
    bindings: {
      bucket: {
        obj: bucket,
        ops: ["delete","get","get_json","list","public_url","put","put_json"]
      },
    }
  });
  (queue.onMessage(handler));
  const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 0 });
  this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"IncrementCounter",new $stdlib.core.Inflight(this, "$Inflight2", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.400c090b2c3fde2bc7ebd07fa5c9e4bbf78d752be8f15edc4c2483b8d25ba7e6/index.js".replace(/\\/g, "/"))),
    bindings: {
      counter: {
        obj: counter,
        ops: ["dec","inc","peek","reset"]
      },
    }
  }));
  const topic = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"Topic");
  (topic.onMessage(new $stdlib.core.Inflight(this, "$Inflight3", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.ed728fd2603d3a430731f646a250b7278009a47c2f735d2845326dd1adf3c4e6/index.js".replace(/\\/g, "/"))),
    bindings: {
    }
  })));
  (topic.onMessage(new $stdlib.core.Inflight(this, "$Inflight4", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.6bc1124f5e5c3fbff3cef31400af5fc25f918dca7f2c8f7a2f925c6fa27937cf/index.js".replace(/\\/g, "/"))),
    bindings: {
    }
  })));
  this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test: Increment counter",new $stdlib.core.Inflight(this, "$Inflight5", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.72f1a462a1af1489063c01d55ed8dfaea77020c3e658fc78ca1a1274a710f9b0/index.js".replace(/\\/g, "/"))),
    bindings: {
      counter: {
        obj: counter,
        ops: ["dec","inc","peek","reset"]
      },
    }
  }));
  this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test: Push message to the queue",new $stdlib.core.Inflight(this, "$Inflight6", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.b97ff94ec855d87121373e2f9e19a3914f2eb63da347828a1793d9b692a3cf5b/index.js".replace(/\\/g, "/"))),
    bindings: {
      queue: {
        obj: queue,
        ops: ["approx_size","purge","push"]
      },
    }
  }));
  this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test: Print",new $stdlib.core.Inflight(this, "$Inflight7", {
    code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.ba6bc93ab10924b8acc3323a533bc4821216868e70f16cdb5c47f971c3697994/index.js".replace(/\\/g, "/"))),
    bindings: {
    }
  }));
}
}
new MyApp().synth();