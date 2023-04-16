const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Fetch extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      _toInflight() {
        const self_client_path = "./clients/Fetch.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Fetch({
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Fetch._annotateInflight("$inflight_init", {});
    Fetch._annotateInflight("get", {});
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.715acfaea3ff48e55a13ccb9337f2fa4389dd31fffa5b0f24a07bfa56038dcd8/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    (api.get("/users/{name}",handler));
    const f = new Fetch(this,"Fetch");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.718eff3f4061776cb4ae50876841ab4ee2dad187ff545f5ac2ae1e6beeb7d65e/index.js".replace(/\\/g, "/"))),
      bindings: {
        api: {
          obj: api,
          ops: []
        },
        f: {
          obj: f,
          ops: ["get"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "api_path_vars", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
