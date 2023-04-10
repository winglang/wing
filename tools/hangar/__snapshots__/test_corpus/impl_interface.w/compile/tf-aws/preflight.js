const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";

function __app(target) {
	switch (target) {
		case "sim":
			return $stdlib.sim.App;
		case "tfaws":
		case "tf-aws":
			return $stdlib.tfaws.App;
		case "tf-gcp":
			return $stdlib.tfgcp.App;
		case "tf-azure":
			return $stdlib.tfazure.App;
		case "awscdk":
			return $stdlib.awscdk.App;
		default:
			throw new Error(`Unknown WING_TARGET value: "${process.env.WING_TARGET ?? ""}"`);
	}
}
const $AppBase = __app(process.env.WING_TARGET);

const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.core.Resource {
	constructor(scope, id, ) {
	super(scope, id);
{
}
}
	
	_toInflight() {
	
	const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).A({}))`);
}
}
A._annotateInflight("handle", {});
A._annotateInflight("$init", {});
    class r extends $stdlib.core.Resource {
	constructor(scope, id, ) {
	super(scope, id);
{
}
}
	 method_1(x)  {
	{
  return x;
}
}
 method_3(x)  {
	{
  return x;
}
}
	_toInflight() {
	
	const self_client_path = "./clients/r.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).r({}))`);
}
}
r._annotateInflight("method_2", {});
r._annotateInflight("$init", {});
    class Dog extends $stdlib.core.Resource {
	constructor(scope, id, ) {
	super(scope, id);
{
}
}
	
	_toInflight() {
	
	const self_client_path = "./clients/Dog.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).Dog({}))`);
}
}
Dog._annotateInflight("eat", {});
Dog._annotateInflight("$init", {});
    const x = new A(this,"A");
    const y = new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.a5455e5c5848cfc293fcb861d9393d32e29a39f8dc8ac79c19dd5289279762fe/index.js".replace(/\\/g, "/"))),
  bindings: {
    x: {
      obj: x,
      ops: []
    },
  }
});
    const z = new Dog(this,"Dog");
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "impl_interface", plugins: $plugins, isTestEnvironment: $wing_is_test });
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