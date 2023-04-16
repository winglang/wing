const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const x = 12;
    const handler2 = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.e77b2aeb97c35bb5ecb6ba6b78fbfcd563e286c79149651961f500a8042998c8/index.js".replace(/\\/g, "/"))),
      bindings: {
        b: {
          obj: b,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
        x: {
          obj: x,
          ops: []
        },
      }
    })
    ;
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",handler2);
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_in_binary", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
