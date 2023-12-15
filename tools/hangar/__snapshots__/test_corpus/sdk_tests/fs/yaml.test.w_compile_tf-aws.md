# [yaml.test.w](../../../../../../examples/tests/sdk_tests/fs/yaml.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $data, $fs_Util, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const filepath = String.raw({ raw: ["", "/test-inflight.yaml"] }, tmpdir);
      (await $fs_Util.writeYaml(filepath, $data, $data));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),true)))};
      const objs = (await $fs_Util.readYaml(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs.length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(0)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(objs, 0)]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$data]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(1)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(objs, 1)]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$data]))))};
      (await $fs_Util.remove(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),false)))};
      (await $fs_Util.remove(tmpdir, ({"recursive": true})));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(tmpdir)),false)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
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
    "outputs": {}
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
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $data: ${$stdlib.core.liftObject(data)},
            $fs_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(data, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const tmpdir = (fs.Util.mkdtemp());
    const filepath = String.raw({ raw: ["", "/test-preflight.yaml"] }, tmpdir);
    const data = ({"foo": "bar", "arr": [1, 2, 3, "test", ({"foo": "bar"})]});
    (fs.Util.writeFile(filepath, "invalid: {{ content }}, invalid"));
    try {
      (fs.Util.readYaml(filepath));
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^bad indentation\", e)")})((regex.Util.match("^bad indentation", e)))};
    }
    (fs.Util.writeYaml(filepath, data, data));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),true)))};
    const objs = (fs.Util.readYaml(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: objs.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(0)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(objs, 0)]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([data]))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(1)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(objs, 1)]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([data]))))};
    (fs.Util.remove(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),false)))};
    (fs.Util.remove(tmpdir, ({"recursive": true})));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(tmpdir)),false)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight yaml operations", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "yaml.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

