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
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc.85cd22e95db4b8ae13939c7cb02f67a11a2af3c66bd3ccb217b2336de0f22399/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    try {
      (api.get("/test/{sup:er/:annoying//path}",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/{sup:er/:annoying//path}. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/{sup:er/:annoying//path}. Routes and params should consist of alpha-numeric characters only."))};
    }
    try {
      (api.get("/test/{::another:annoying:path}",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/{::another:annoying:path}. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/{::another:annoying:path}. Routes and params should consist of alpha-numeric characters only."))};
    }
    try {
      (api.get("/test/n0t_alphanumer1cPa:th",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/n0t_alphanumer1cPa:th. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/n0t_alphanumer1cPa:th. Routes and params should consist of alpha-numeric characters only."))};
    }
    try {
      (api.get("/test/path/{with}/{two:invali4d#}/variables",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/path/{with}/{two:invali4d#}/variables. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/path/{with}/{two:invali4d#}/variables. Routes and params should consist of alpha-numeric characters only."))};
    }
    try {
      (api.get("/test/path/{unclosed",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/path/{unclosed. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/path/{unclosed. Routes and params should consist of alpha-numeric characters only."))};
    }
    try {
      (api.get("/test/m{issplaced}",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/m{issplaced}. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/m{issplaced}. Routes and params should consist of alpha-numeric characters only."))};
    }
    try {
      (api.get("/test/{misspla}ced",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/{misspla}ced. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/{misspla}ced. Routes and params should consist of alpha-numeric characters only."))};
    }
    try {
      (api.get("/test/{}/empty",handler));
    }
    catch ($error_error) {
      const error = $error_error.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Invalid route /test/{}/empty. Routes and params should consist of alpha-numeric characters only.")'`)})((error === "Invalid route /test/{}/empty. Routes and params should consist of alpha-numeric characters only."))};
    }
    (api.get("/test",handler));
    (api.get("/test/alphanumer1cPa_th",handler));
    (api.get("/test/regular/path",handler));
    (api.get("/test/path/{with}/two/{variable_s}/f?bla=5&b=6",handler));
    (api.get("/test/param/is/{last}",handler));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "api_valid_path", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
