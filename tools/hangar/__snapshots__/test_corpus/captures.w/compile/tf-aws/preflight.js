const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PublicBucket",{
    "public": true,}
    );
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PrivateBucket",{ public: false });
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        bucket1: {
          obj: bucket1,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
        bucket2: {
          obj: bucket2,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
        bucket3: {
          obj: bucket3,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
      }
    })
    ;
    (queue.addConsumer(handler,{ batchSize: 5 }));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",handler,{ env: Object.freeze({}) });
    const empty_env = Object.freeze({});
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"AnotherFunction",handler,{ env: empty_env });
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "captures", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
