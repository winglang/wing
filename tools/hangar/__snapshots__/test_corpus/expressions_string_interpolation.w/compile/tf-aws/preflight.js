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
    const regular_string = "str\n\"";
    const empty_string = "";
    const number = 1;
    const cool_string = `cool \"\${${regular_string}}\" test`;
    const really_cool_string = `${number}${empty_string}\n${cool_string}\n\${empty_string}${"string-in-string"}!`;
    const begining_with_cool_strings = `${regular_string} ${number} <- cool`;
    const ending_with_cool_strings = `cool -> ${regular_string} ${number}`;
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "expressions_string_interpolation", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
