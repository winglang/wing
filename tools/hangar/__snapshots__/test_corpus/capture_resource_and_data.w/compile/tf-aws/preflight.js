const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    const data = Object.freeze(new Set([1, 2, 3]));
    const res = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.282c2371efeb58766c430a9fafcc2f6b12044c38815124df7fe9b4da83adc985/index.js".replace(/\\/g, "/"))),
      bindings: {
        data: {
          obj: data,
          ops: []
        },
        queue: {
          obj: queue,
          ops: ["approx_size","purge","push"]
        },
        res: {
          obj: res,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
      }
    })
    ;
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",handler);
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_resource_and_data", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
