const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const projen = require("projen");
class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(projen.LogLevel.OFF !== projen.LogLevel.VERBOSE)'`)})((projen.LogLevel.OFF !== projen.LogLevel.VERBOSE))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bring_projen", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
