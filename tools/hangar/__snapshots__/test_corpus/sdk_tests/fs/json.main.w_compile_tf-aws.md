# [json.main.w](../../../../../../examples/tests/sdk_tests/fs/json.main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $data, $filename, $fs_Util, $regex_Util, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      try {
        (await $fs_Util.writeFile($filename,"invalid content"));
        (await $fs_Util.readJson($filename));
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^Unexpected token\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $regex_Util.match("^Unexpected token",e)),true)))};
      }
      (await $fs_Util.writeJson($filename,$data));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filename) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists($filename)),true)))};
      const obj = (await $fs_Util.readJson($filename));
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(obj) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$data]))))};
      (await $fs_Util.remove($filename));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filename) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists($filename)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.tryReadJson(filename) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.tryReadJson($filename)),undefined)))};
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
const fs = $stdlib.fs;
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
            $data: ${context._lift(data)},
            $filename: ${context._lift(filename)},
            $fs_Util: ${context._lift($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
            $regex_Util: ${context._lift($stdlib.core.toLiftableModuleType(regex.Util, "@winglang/sdk/regex", "Util"))},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(data, host, []);
          $Closure1._registerBindObject(filename, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const filename = "test-json.json";
    const data = ({"foo": "bar","arr": [1, 2, 3, "test", ({"foo": "bar"})]});
    try {
      (fs.Util.writeFile(filename,"invalid content"));
      (fs.Util.readJson(filename));
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^Unexpected token\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((regex.Util.match("^Unexpected token",e)),true)))};
    }
    (fs.Util.writeJson(filename,data));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filename) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filename)),true)))};
    const obj = (fs.Util.readJson(filename));
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(obj) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([data]))))};
    (fs.Util.remove(filename));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filename) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filename)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.tryReadJson(filename) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.tryReadJson(filename)),undefined)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight json operations",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

