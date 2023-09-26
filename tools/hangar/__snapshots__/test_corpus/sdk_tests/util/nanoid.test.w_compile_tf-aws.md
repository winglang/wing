# [nanoid.test.w](../../../../../../examples/tests/sdk_tests/util/nanoid.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const standard_id = (await $util_Util.nanoid());
      {((cond) => {if (!cond) throw new Error("assertion failed: standard_id.length == 21")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(standard_id.length,21)))};
      const id_size10 = (await $util_Util.nanoid({ size: 10 }));
      {((cond) => {if (!cond) throw new Error("assertion failed: id_size10.length == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(id_size10.length,10)))};
      const id_custom = (await $util_Util.nanoid({ alphabet: "01*/ab" }));
      {((cond) => {if (!cond) throw new Error("assertion failed: id_custom.length == 21")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(id_custom.length,21)))};
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,id_custom.length,false)) {
        if (((((((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"0")) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"1"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"*"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"/"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"a"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"b")))) {
          {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
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
const util = $stdlib.util;
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
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
    const standard_id = (util.Util.nanoid());
    {((cond) => {if (!cond) throw new Error("assertion failed: standard_id.length == 21")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(standard_id.length,21)))};
    const id_size10 = (util.Util.nanoid({ size: 10 }));
    {((cond) => {if (!cond) throw new Error("assertion failed: id_size10.length == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(id_size10.length,10)))};
    const id_custom = (util.Util.nanoid({ alphabet: "01*/ab" }));
    {((cond) => {if (!cond) throw new Error("assertion failed: id_custom.length == 21")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(id_custom.length,21)))};
    for (const i of $stdlib.std.Range.of(0, id_custom.length, false)) {
      if (((((((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"0")) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"1"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"*"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"/"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"a"))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i),"b")))) {
        {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight nanoid",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "nanoid.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

