# [base64.test.w](../../../../../../examples/tests/sdk_tests/util/base64.test.w) | compile | tf-aws

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
      const string = "https://www.winglang.io/docs";
      const base64Encode = (await $util_Util.base64Encode(string));
      const base64urlEncode = (await $util_Util.base64Encode(string,true));
      const base64Decode = (await $util_Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw=="));
      const base64urlDecode = (await $util_Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw",true));
      {((cond) => {if (!cond) throw new Error("assertion failed: base64Encode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Encode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: base64urlEncode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlEncode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: base64Decode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Decode,string)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: base64urlDecode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlDecode,string)))};
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
"use strict";
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
    const string = "https://www.winglang.io/docs";
    const base64Encode = (util.Util.base64Encode(string));
    const base64urlEncode = (util.Util.base64Encode(string,true));
    const base64Decode = (util.Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw=="));
    const base64urlDecode = (util.Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw",true));
    {((cond) => {if (!cond) throw new Error("assertion failed: base64Encode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Encode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: base64urlEncode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlEncode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: base64Decode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Decode,string)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: base64urlDecode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlDecode,string)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight base64",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "base64.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

