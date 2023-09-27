# [map.test.w](../../../../../../examples/tests/sdk_tests/std/map.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const immutGet = ({"mutable": false});
      const mutGet = ({"mutable": true});
      {((cond) => {if (!cond) throw new Error("assertion failed: immutGet.get(\"mutable\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(immutGet, "mutable"),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutGet.get(\"mutable\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(mutGet, "mutable"),true)))};
      const KEY_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"immutable\"";
      (await assertThrows(KEY_DOES_NOT_EXIST_ERROR,async () => {
        ((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(immutGet, "immutable");
        ((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(mutGet, "immutable");
      }
      ));
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
    const m = ({"hello": 123,"world": 99});
    const mkeys = Object.keys(m);
    {((cond) => {if (!cond) throw new Error("assertion failed: mkeys.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mkeys.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mkeys.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mkeys.at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mkeys.at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mkeys.at(1)),"world")))};
    const mvalues = Object.values(m);
    {((cond) => {if (!cond) throw new Error("assertion failed: mvalues.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mvalues.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mvalues.at(0) == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mvalues.at(0)),123)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mvalues.at(1) == 99")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mvalues.at(1)),99)))};
    const assertThrows = ((expected, block) => {
      let error = false;
      try {
        (block());
      }
      catch ($error_actual) {
        const actual = $error_actual.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    });
    const immutGet = ({"mutable": false});
    const mutGet = ({"mutable": true});
    {((cond) => {if (!cond) throw new Error("assertion failed: immutGet.get(\"mutable\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(immutGet, "mutable"),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mutGet.get(\"mutable\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(mutGet, "mutable"),true)))};
    const KEY_DOES_NOT_EXIST_ERROR = "Object does not contain the key \"immutable\"";
    (assertThrows(KEY_DOES_NOT_EXIST_ERROR,(() => {
      ((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(immutGet, "immutable");
      ((obj, args) => { if (obj[args] === undefined) throw new Error(`Object does not contain the key "${args}"`); return obj[args] })(mutGet, "immutable");
    })));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:get()",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "map.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

