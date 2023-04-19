const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const redis = require('@winglang/sdk').redis;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const r = this.node.root.newAbstract("@winglang/sdk.redis.Redis",this,"redis.Redis");
    const r2 = this.node.root.newAbstract("@winglang/sdk.redis.Redis",this,"r2");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        r: {
          obj: r,
          ops: ["del","get","hget","hset","raw_client","sadd","set","smembers","url"]
        },
        r2: {
          obj: r2,
          ops: ["del","get","hget","hset","raw_client","sadd","set","smembers","url"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "redis", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
