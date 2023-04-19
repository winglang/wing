const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const s1 = "some string";
    const s2 = "s are immutable";
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s1.length === 11)'`)})((s1.length === 11))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.at(7)) === "r")'`)})(((s1.at(7)) === "r"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.concat(s2)) === "some strings are immutable")'`)})(((s1.concat(s2)) === "some strings are immutable"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.includes("some")'`)})(s1.includes("some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!"some".includes(s1))'`)})((!"some".includes(s1)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.endsWith("string")'`)})(s1.endsWith("string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s1.indexOf("s") === 0)'`)})((s1.indexOf("s") === 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("Some String".toLocaleLowerCase() === "some string")'`)})(("Some String".toLocaleLowerCase() === "some string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((s1.split(" ")).at(0)) === "some")'`)})((((s1.split(" ")).at(0)) === "some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.startsWith("some")'`)})(s1.startsWith("some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.substring(5)) === "string")'`)})(((s1.substring(5)) === "string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.substring(5,7)) === "st")'`)})(((s1.substring(5,7)) === "st"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(("   some string   ".trim()) === "some string")'`)})((("   some string   ".trim()) === "some string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("Some String".toLocaleUpperCase() === "SOME STRING")'`)})(("Some String".toLocaleUpperCase() === "SOME STRING"))};
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:string",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        s1: {
          obj: s1,
          ops: []
        },
        s2: {
          obj: s2,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "std_string", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
