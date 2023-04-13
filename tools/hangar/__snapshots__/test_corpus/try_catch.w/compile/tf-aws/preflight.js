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
    let x = "";
    try {
      {((msg) => {throw new Error(msg)})("hello")};
      x = "no way I got here";
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(e === "hello")'`)})((e === "hello"))};
      x = "caught";
    }
    finally {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === "caught")'`)})((x === "caught"))};
      x = "finally";
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === "finally")'`)})((x === "finally"))};
    try {
      x = "I got here";
    }
    catch ($error_e) {
      const e = $error_e.message;
      x = "caught";
    }
    finally {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === "I got here")'`)})((x === "I got here"))};
      x = "finally";
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === "finally")'`)})((x === "finally"))};
    try {
      try {
        {((msg) => {throw new Error(msg)})("hello")};
      }
      finally {
        x = "finally with no catch";
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === "finally with no catch")'`)})((x === "finally with no catch"))};
    }
    catch {
    }
    try {
    }
    finally {
      x = "finally with no catch and no exception";
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === "finally with no catch and no exception")'`)})((x === "finally with no catch and no exception"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((( () =>  {
      {
        try {
        }
        finally {
          return 1;
        }
      }
    }
    )()) === 1)'`)})(((( () =>  {
      {
        try {
        }
        finally {
          return 1;
        }
      }
    }
    )()) === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((( () =>  {
      {
        try {
          {((msg) => {throw new Error(msg)})("")};
        }
        catch {
          return 2;
        }
      }
    }
    )()) === 2)'`)})(((( () =>  {
      {
        try {
          {((msg) => {throw new Error(msg)})("")};
        }
        catch {
          return 2;
        }
      }
    }
    )()) === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((( () =>  {
      {
        try {
          return 3;
        }
        finally {
        }
      }
    }
    )()) === 3)'`)})(((( () =>  {
      {
        try {
          return 3;
        }
        finally {
        }
      }
    }
    )()) === 3))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "try_catch", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
