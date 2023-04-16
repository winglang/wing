const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Super {
      constructor()  {
        this.name = "Super";
      }
      name;
    }
    class Sub extends Super {
      constructor()  {
        this.name = "Sub";
      }
    }
    class Sub1 extends Super {
      constructor()  {
        this.name = "Sub";
      }
    }
    const x = 4;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((x) != null) === true)'`)})((((x) != null) === true))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((!((x) != null)) === false)'`)})(((!((x) != null)) === false))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((x ?? 5) === 4)'`)})(((x ?? 5) === 4))};
    const y = (x ?? 5);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === 4)'`)})((y === 4))};
    const optional_sup = new Super();
    const s = (optional_sup ?? new Sub());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s.name === "Super")'`)})((s.name === "Super"))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "optionals", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
