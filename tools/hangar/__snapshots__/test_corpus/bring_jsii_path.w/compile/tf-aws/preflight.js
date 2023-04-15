const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const jsii_code_samples = require("./node_modules/jsii-code-samples");
class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    const hello = new jsii_code_samples.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:say_hello",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.1372506e446d613df98f26f19320b8c00830bc74a7bc9a52b8365c0c5c4d315b/index.js".replace(/\\/g, "/"))),
      bindings: {
        greeting: {
          obj: greeting,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bring_jsii_path", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
