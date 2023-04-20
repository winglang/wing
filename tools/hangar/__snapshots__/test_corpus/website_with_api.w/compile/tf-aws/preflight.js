const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const website = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"cloud.Website",{ path: "./website_with_api" });
    const users_table = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{
    "name": "users-table",
    "primaryKey": "id",
    "columns": Object.freeze({"id":cloud.ColumnType.STRING,"name":cloud.ColumnType.STRING,"age":cloud.ColumnType.NUMBER}),}
    );
    const get_handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        users_table: {
          obj: users_table,
          ops: ["delete","get","insert","list","update"]
        },
      }
    })
    ;
    const post_handler = new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        users_table: {
          obj: users_table,
          ops: ["delete","get","insert","list","update"]
        },
      }
    })
    ;
    const options_handler = new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    (api.get("/users",get_handler));
    (api.post("/users",post_handler));
    (api.options("/users",options_handler));
    (website.addJson("config.json",Object.freeze({"apiUrl":api.url})));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "website_with_api", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
