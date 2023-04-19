const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
      _toInflight() {
        const c_client = this._lift(this.c);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Foo({
              c: ${c_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Foo._annotateInflight("$inflight_init", {"this.c": { ops: ["dec","inc"] },"this.stateful": { ops: [] }});
    Foo._annotateInflight("foo_get", {"this.c": { ops: ["peek"] }});
    Foo._annotateInflight("foo_inc", {"this.c": { ops: ["inc"] }});
    class Bar extends $stdlib.std.Resource {
      constructor(scope, id, name, b) {
        super(scope, id);
        this.name = name;
        this.b = b;
        this.foo = new Foo(this,"Foo");
      }
      _toInflight() {
        const b_client = this._lift(this.b);
        const foo_client = this._lift(this.foo);
        const name_client = this._lift(this.name);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Bar.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Bar({
              b: ${b_client},
              foo: ${foo_client},
              name: ${name_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Bar._annotateInflight("$inflight_init", {"this.b": { ops: [] },"this.foo": { ops: [] },"this.name": { ops: [] },"this.stateful": { ops: [] }});
    Bar._annotateInflight("my_method", {"this.b": { ops: ["get","put"] },"this.foo": { ops: ["foo_get","foo_inc"] }});
    class BigPublisher extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.b2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b2");
        this.q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.t = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        (this.t.onMessage(new $stdlib.core.Inflight(this, "$Inflight1", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
          bindings: {
            this: {
              obj: this,
              ops: ["getObjectCount","publish"]
            },
          }
        })
        ));
        (this.q.addConsumer(new $stdlib.core.Inflight(this, "$Inflight2", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
          bindings: {
            this: {
              obj: this,
              ops: ["getObjectCount","publish"]
            },
          }
        })
        ));
        (this.b2.onCreate(new $stdlib.core.Inflight(this, "$Inflight3", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
          bindings: {
            this: {
              obj: this,
              ops: ["getObjectCount","publish"]
            },
          }
        })
        ));
      }
      _toInflight() {
        const b_client = this._lift(this.b);
        const b2_client = this._lift(this.b2);
        const q_client = this._lift(this.q);
        const t_client = this._lift(this.t);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/BigPublisher.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).BigPublisher({
              b: ${b_client},
              b2: ${b2_client},
              q: ${q_client},
              t: ${t_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    BigPublisher._annotateInflight("$inflight_init", {"this.b": { ops: [] },"this.b2": { ops: [] },"this.q": { ops: [] },"this.stateful": { ops: [] },"this.t": { ops: [] }});
    BigPublisher._annotateInflight("getObjectCount", {"this.b": { ops: ["list"] }});
    BigPublisher._annotateInflight("publish", {"this.b2": { ops: ["put"] },"this.q": { ops: ["push"] },"this.t": { ops: ["publish"] }});
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const res = new Bar(this,"Bar","Arr",bucket);
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight4", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc4/index.js".replace(/\\/g, "/"))),
      bindings: {
        bucket: {
          obj: bucket,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
        res: {
          obj: res,
          ops: ["my_method"]
        },
      }
    })
    );
    const bigOlPublisher = new BigPublisher(this,"BigPublisher");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test: dependency cycles",new $stdlib.core.Inflight(this, "$Inflight5", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc5/index.js".replace(/\\/g, "/"))),
      bindings: {
        bigOlPublisher: {
          obj: bigOlPublisher,
          ops: ["getObjectCount","publish"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
