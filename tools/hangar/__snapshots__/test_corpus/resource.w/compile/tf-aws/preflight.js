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
    class Foo extends $stdlib.core.Resource {
	constructor(scope, id, ) {
	super(scope, id);
{
  this.c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
}
}
	
	_toInflight() {
	const c_client = this._lift(this.c);
	const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).Foo({c: ${c_client}}))`);
}
}
Foo._annotateInflight("foo_inc", {"this.c": { ops: ["inc"] }});
Foo._annotateInflight("foo_get", {"this.c": { ops: ["peek"] }});
Foo._annotateInflight("$init", {"this.c": { ops: [] }});
    class Bar extends $stdlib.core.Resource {
	constructor(scope, id, name, b) {
	super(scope, id);
{
  this.name = name;
  this.b = b;
  this.foo = new Foo(this,"Foo");
}
}
	
	_toInflight() {
	const b_client = this._lift(this.b);
const foo_client = this._lift(this.foo);
const name_client = this._lift(this.name);
	const self_client_path = "./clients/Bar.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).Bar({b: ${b_client}, foo: ${foo_client}, name: ${name_client}}))`);
}
}
Bar._annotateInflight("my_method", {"this.b": { ops: ["get","put"] },"this.foo": { ops: ["foo_get","foo_inc"] }});
Bar._annotateInflight("$init", {"this.b": { ops: [] },"this.foo": { ops: [] },"this.name": { ops: [] }});
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const res = new Bar(this,"Bar","Arr",bucket);
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
  code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.e50bc85b13df379286b4aa72aa88788422e26d9146adbc9bba989a8a59253a73/index.js".replace(/\\/g, "/"))),
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
}));
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