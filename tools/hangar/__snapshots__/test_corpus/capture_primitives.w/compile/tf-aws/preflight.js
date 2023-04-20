const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const my_str = "hello, string";
    const my_num = 1234;
    const my_bool = true;
    const my_second_bool = false;
    const my_dur = $stdlib.std.Duration.fromSeconds(600);
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        my_bool: {
          obj: my_bool,
          ops: []
        },
        my_dur: {
          obj: my_dur,
          ops: []
        },
        my_num: {
          obj: my_num,
          ops: []
        },
        my_second_bool: {
          obj: my_second_bool,
          ops: []
        },
        my_str: {
          obj: my_str,
          ops: []
        },
      }
    })
    ;
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",handler);
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_primitives", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
