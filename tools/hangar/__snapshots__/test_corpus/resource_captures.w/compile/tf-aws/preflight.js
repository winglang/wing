const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.my_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      _toInflight() {
        const my_resource_client = this._lift(this.my_resource);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/First.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).First({
              my_resource: ${my_resource_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    First._annotateInflight("$inflight_init", {"this.my_resource": { ops: [] },"this.stateful": { ops: [] }});
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.my_field = "hello!";
        this.first = new First(this,"First");
      }
      _toInflight() {
        const first_client = this._lift(this.first);
        const my_field_client = this._lift(this.my_field);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Another.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Another({
              first: ${first_client},
              my_field: ${my_field_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Another._annotateInflight("$inflight_init", {"this.first": { ops: [] },"this.my_field": { ops: [] },"this.stateful": { ops: [] }});
    Another._annotateInflight("another_func", {});
    Another._annotateInflight("meaning_of_life", {});
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, external_bucket, external_num) {
        super(scope, id);
        this.my_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.my_str = "my_string";
        this.my_num = 42;
        this.my_bool = true;
        this.array_of_str = Object.freeze(["s1", "s2"]);
        this.map_of_num = Object.freeze({"k1":11,"k2":22});
        this.set_of_str = Object.freeze(new Set(["s1", "s2", "s1"]));
        this.another = new Another(this,"Another");
        this.my_queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.ext_bucket = external_bucket;
        this.ext_num = external_num;
        this.unused_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
       hello_preflight()  {
        {
          return this.another;
        }
      }
      _toInflight() {
        const another_client = this._lift(this.another);
        const array_of_str_client = this._lift(this.array_of_str);
        const ext_bucket_client = this._lift(this.ext_bucket);
        const ext_num_client = this._lift(this.ext_num);
        const map_of_num_client = this._lift(this.map_of_num);
        const my_bool_client = this._lift(this.my_bool);
        const my_num_client = this._lift(this.my_num);
        const my_queue_client = this._lift(this.my_queue);
        const my_resource_client = this._lift(this.my_resource);
        const my_str_client = this._lift(this.my_str);
        const set_of_str_client = this._lift(this.set_of_str);
        const unused_resource_client = this._lift(this.unused_resource);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/MyResource.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).MyResource({
              another: ${another_client},
              array_of_str: ${array_of_str_client},
              ext_bucket: ${ext_bucket_client},
              ext_num: ${ext_num_client},
              map_of_num: ${map_of_num_client},
              my_bool: ${my_bool_client},
              my_num: ${my_num_client},
              my_queue: ${my_queue_client},
              my_resource: ${my_resource_client},
              my_str: ${my_str_client},
              set_of_str: ${set_of_str_client},
              unused_resource: ${unused_resource_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    MyResource._annotateInflight("$inflight_init", {"this.another": { ops: [] },"this.array_of_str": { ops: [] },"this.ext_bucket": { ops: [] },"this.ext_num": { ops: [] },"this.map_of_num": { ops: [] },"this.my_bool": { ops: [] },"this.my_num": { ops: [] },"this.my_queue": { ops: [] },"this.my_resource": { ops: [] },"this.my_str": { ops: [] },"this.set_of_str": { ops: [] },"this.stateful": { ops: [] },"this.unused_resource": { ops: [] }});
    MyResource._annotateInflight("test_capture_collections_of_data", {"this.array_of_str": { ops: ["at","length"] },"this.map_of_num": { ops: ["get"] },"this.set_of_str": { ops: ["has"] }});
    MyResource._annotateInflight("test_capture_primitives", {"this.my_bool": { ops: [] },"this.my_num": { ops: [] },"this.my_str": { ops: [] }});
    MyResource._annotateInflight("test_capture_resource", {"this.my_resource": { ops: ["get","list","put"] }});
    MyResource._annotateInflight("test_expression_recursive", {"this.my_queue": { ops: ["push"] },"this.my_str": { ops: [] }});
    MyResource._annotateInflight("test_external", {"this.ext_bucket": { ops: ["list"] },"this.ext_num": { ops: [] }});
    MyResource._annotateInflight("test_inflight_field", {});
    MyResource._annotateInflight("test_nested_preflight_field", {"this.another.my_field": { ops: [] }});
    MyResource._annotateInflight("test_nested_resource", {"this.another.first.my_resource": { ops: ["get","list","put"] },"this.my_str": { ops: [] }});
    MyResource._annotateInflight("test_no_capture", {});
    MyResource._annotateInflight("test_user_defined_resource", {"this.another": { ops: ["another_func","meaning_of_life"] }});
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const r = new MyResource(this,"MyResource",b,12);
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        r: {
          obj: r,
          ops: ["test_capture_collections_of_data","test_capture_primitives","test_capture_resource","test_expression_recursive","test_external","test_inflight_field","test_nested_preflight_field","test_nested_resource","test_no_capture","test_user_defined_resource"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource_captures", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
