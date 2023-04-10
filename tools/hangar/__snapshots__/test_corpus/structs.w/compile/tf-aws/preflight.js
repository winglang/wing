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

class $Root extends $stdlib.core.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.core.Resource {
	constructor(scope, id, b) {
	super(scope, id);
{
  this.data = b;
}
}
	
	_toInflight() {
	const data_client = this._lift(this.data);
	const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
	return $stdlib.core.NodeJsCode.fromInline(`(new (require("${self_client_path}")).Foo({data: ${data_client}}))`);
}
}
Foo._annotateInflight("get_stuff", {"this.data.field0": { ops: [] }});
Foo._annotateInflight("$init", {"this.data": { ops: [] }});
    const x = {
"field0": "Sup",}
;
    const y = {
"field0": "hello",
"field1": 1,
"field2": "world",
"field3": {
"field0": "foo",}
,}
;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x.field0 === "Sup")'`)})((x.field0 === "Sup"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y.field1 === 1)'`)})((y.field1 === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y.field3.field0 === "foo")'`)})((y.field3.field0 === "foo"))};
  }
}

class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "structs", plugins: $plugins, isTestEnvironment: $wing_is_test });
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