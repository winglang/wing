# [match.test.w](../../../../../../examples/tests/sdk_tests/regex/match.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $regex_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const matches1 = (await $regex_Util.match("p[a-z]+ch","peach"));
      const matches2 = (await $regex_Util.match("[0-9]+","0923"));
      const matches3 = (await $regex_Util.match("[0-9]+","0a923"));
      const matches4 = (await $regex_Util.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$","james_bond007@wing.com"));
      const matches5 = (await $regex_Util.match("p([a-z]+)ch","leach"));
      const matches6 = (await $regex_Util.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+","@james_bond007@gmail.com"));
      const matches7 = (await $regex_Util.match("^Mary","Mary had a little lamb"));
      const matches8 = (await $regex_Util.match("lamb\$","Mary had a little lamb"));
      const matches9 = (await $regex_Util.match("lamb\$","Mary had a little hamb"));
      const matches10 = (await $regex_Util.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$","james_bond007@gmail.com123"));
      {((cond) => {if (!cond) throw new Error("assertion failed: matches1 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches1,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches2 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches2,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches3 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches3,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches4 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches4,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches5 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches5,false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches6 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches6,false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches7 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches7,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches8 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches8,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches9 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches9,false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: matches10 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches10,false)))};
    }
    async $inflight_init() {
    }
  }
  return $Closure1;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const regex = $stdlib.regex;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $regex_Util: ${context._lift($stdlib.core.toLiftableModuleType(regex.Util, "@winglang/sdk/regex", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    const matches1 = (regex.Util.match("p[a-z]+ch","peach"));
    const matches2 = (regex.Util.match("[0-9]+","0923"));
    const matches3 = (regex.Util.match("[0-9]+","0a923"));
    const matches4 = (regex.Util.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$","james_bond007@wing.com"));
    const matches5 = (regex.Util.match("p([a-z]+)ch","leach"));
    const matches6 = (regex.Util.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+","@james_bond007@gmail.com"));
    const matches7 = (regex.Util.match("^Mary","Mary had a little lamb"));
    const matches8 = (regex.Util.match("lamb\$","Mary had a little lamb"));
    const matches9 = (regex.Util.match("lamb\$","Mary had a little hamb"));
    const matches10 = (regex.Util.match("^([a-zA-Z0-9_.-]+)@[a-z]+.[a-z]+\$","james_bond007@gmail.com123"));
    {((cond) => {if (!cond) throw new Error("assertion failed: matches1 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches1,true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches2 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches2,true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches3 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches3,true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches4 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches4,true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches5 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches5,false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches6 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches6,false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches7 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches7,true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches8 == true ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches8,true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches9 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches9,false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: matches10 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(matches10,false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight match",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "match.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

