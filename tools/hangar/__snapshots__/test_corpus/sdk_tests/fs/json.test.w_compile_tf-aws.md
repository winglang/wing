# [json.test.w](../../../../../../examples/tests/sdk_tests/fs/json.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $data, $fs_Util, $regex_Util, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const filepath = String.raw({ raw: ["", "/test-inflight.json"] }, tmpdir);
      try {
        (await $fs_Util.writeFile(filepath, "invalid content"));
        (await $fs_Util.readJson(filepath));
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^Unexpected token\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $regex_Util.match("^Unexpected token", e)),true)))};
      }
      (await $fs_Util.writeJson(filepath, $data));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),true)))};
      const obj = (await $fs_Util.readJson(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(obj) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$data]))))};
      (await $fs_Util.remove(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.tryReadJson(filepath) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.tryReadJson(filepath)),undefined)))};
      (await $fs_Util.remove(tmpdir, ({"recursive": true})));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(tmpdir)),false)))};
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const fs = $stdlib.fs;
const regex = $stdlib.regex;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.cjs")({
            $data: ${context._lift(data)},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(data, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const tmpdir = (fs.Util.mkdtemp());
    const filepath = String.raw({ raw: ["", "/test-preflight.json"] }, tmpdir);
    const data = ({"foo": "bar","arr": [1, 2, 3, "test", ({"foo": "bar"})]});
    try {
      (fs.Util.writeFile(filepath, "invalid content"));
      (fs.Util.readJson(filepath));
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^Unexpected token\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((regex.Util.match("^Unexpected token", e)),true)))};
    }
    (fs.Util.writeJson(filepath, data));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),true)))};
    const obj = (fs.Util.readJson(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(obj) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([data]))))};
    (fs.Util.remove(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.tryReadJson(filepath) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.tryReadJson(filepath)),undefined)))};
    (fs.Util.remove(tmpdir, ({"recursive": true})));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(tmpdir)),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight json operations", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

