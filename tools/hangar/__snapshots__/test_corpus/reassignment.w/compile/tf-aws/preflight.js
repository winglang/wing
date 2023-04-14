const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    class R extends $stdlib.core.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        if (true) {
          this.f = 1;
          this.f1 = 0;
        }
      }
       inc()  {
        {
          this.f = (this.f + 1);
        }
      }
      _toInflight() {
        const f1_client = this._lift(this.f1);
        const self_client_path = "./clients/R.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).R({
              f1: ${f1_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    R._annotateInflight("$inflight_init", {"this.f1": { ops: [] }});
    let x = 5;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === 5)'`)})((x === 5))};
    x = (x + 1);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === 6)'`)})((x === 6))};
    const r = new R(this,"R");
    (r.inc());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(r.f === 2)'`)})((r.f === 2))};
    const f =  (arg) =>  {
      {
        arg = 0;
        return arg;
      }
    }
    ;
    const y = 1;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((f(y)) === 0)'`)})(((f(y)) === 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === 1)'`)})((y === 1))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "reassignment", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
