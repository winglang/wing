const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const str_to_str = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"str_to_str",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
    const func = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"func",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.e60080e02327d620984af1e0f736391d5699cae59be5733b234340cc59c07e66/index.js".replace(/\\/g, "/"))),
      bindings: {
        str_to_str: {
          obj: str_to_str,
          ops: ["invoke"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "asynchronous_model_implicit_await_in_functions", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
