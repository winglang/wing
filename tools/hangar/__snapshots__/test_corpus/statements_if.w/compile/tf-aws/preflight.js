const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    if (true) {
      const x = 2;
      const f = false;
      if ((true && ((x + 2) === 4))) {
        if ((true && ((x + 3) === 4))) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
        }
        else if ((true && ((x + 3) === 6))) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
        }
        else if ((false || ((x + 3) === 5))) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'true'`)})(true)};
        }
        else if ((!f)) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(!(!f)))'`)})((!(!(!f))))};
        }
        else {
          {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
        }
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
    }
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "statements_if", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
