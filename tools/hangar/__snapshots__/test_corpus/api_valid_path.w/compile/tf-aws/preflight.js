const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    const test_invalid_path =  (path) =>  {
      {
        let error = "";
        const expected = `Invalid route ${path}. Url cannot contain \":\", params contains only alpha-numeric chars or \"_\".`;
        try {
          (api.get(path,handler));
        }
        catch ($error_e) {
          const e = $error_e.message;
          error = e;
        }
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === expected)'`)})((error === expected))};
      }
    }
    ;
    const test_valid_path =  (path) =>  {
      {
        let error = "";
        try {
          (api.get(path,handler));
        }
        catch ($error_e) {
          const e = $error_e.message;
          error = e;
        }
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "")'`)})((error === ""))};
      }
    }
    ;
    (test_invalid_path("/test/{sup:er/:annoying//path}"));
    (test_invalid_path("/test/{::another:annoying:path}"));
    (test_invalid_path("/test/n0t_alphanumer1cPa:th"));
    (test_invalid_path("/test/path/{with}/{two:invali4d#}/variables"));
    (test_invalid_path("/test/path/{unclosed"));
    (test_invalid_path("/test/m{issplaced}"));
    (test_invalid_path("/test/{misspla}ced"));
    (test_invalid_path("/test/{}/empty"));
    (test_valid_path("/test"));
    (test_valid_path("/test/alphanumer1cPa_th"));
    (test_valid_path("/test/regular/path"));
    (test_valid_path("/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6"));
    (test_valid_path("/test/param/is/{last}"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "api_valid_path", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
