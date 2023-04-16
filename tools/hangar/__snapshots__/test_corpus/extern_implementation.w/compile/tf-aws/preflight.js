const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.core.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static get_greeting(name)  {
        return (require("<ABSOLUTE_PATH>/external_js.js")["get_greeting"])(name)
      }
      static v4()  {
        return (require("<ABSOLUTE_PATH>/index.js")["v4"])()
      }
      _toInflight() {
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Foo({
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Foo._annotateInflight("$inflight_init", {});
    Foo._annotateInflight("call", {});
    Foo._annotateInflight("get_data", {});
    Foo._annotateInflight("get_uuid", {});
    Foo._annotateInflight("print", {});
    Foo._annotateInflight("regex_inflight", {});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.get_greeting("Wingding")) === "Hello, Wingding!")'`)})(((Foo.get_greeting("Wingding")) === "Hello, Wingding!"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.v4()).length === 36)'`)})(((Foo.v4()).length === 36))};
    const f = new Foo(this,"Foo");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:call",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.104793feca8a0c99ea8c2876b3c2124f464b0b5bffc723938b058ed94174607f/index.js".replace(/\\/g, "/"))),
      bindings: {
        f: {
          obj: f,
          ops: ["call","get_data","get_uuid","print","regex_inflight"]
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:console",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.39839ce4a470bf3d8e73b1b650e8bfd7f47f942f676ae2f4e206492f1a49d77c/index.js".replace(/\\/g, "/"))),
      bindings: {
        f: {
          obj: f,
          ops: ["call","get_data","get_uuid","print","regex_inflight"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "extern_implementation", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
