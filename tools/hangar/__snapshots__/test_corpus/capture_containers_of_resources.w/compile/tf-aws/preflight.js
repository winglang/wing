const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const arr = Object.freeze([this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b1"), this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b2")]);
    const map = Object.freeze({"my_queue":this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue")});
    const set = Object.freeze(new Set(["foo", "foo", "bar"]));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        arr: {
          obj: arr,
          ops: []
        },
        map: {
          obj: map,
          ops: []
        },
        set: {
          obj: set,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_containers_of_resources", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
