const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const iterator = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.8df6c52d279b5b0f60f3073722d4666c96d8faf3bae7f82cf289c11a372daa9a/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    const handler = new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.09104e27ddc37691caca765b1b7cb87ad5bcd5f01349ff19070fce915e60db2b/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    (queue.addConsumer(handler));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "while_loop_await", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
