# [directory.test.w](../../../../../../examples/tests/sdk_tests/fs/directory.test.w) | compile | tf-aws

<<<<<<< HEAD
## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $filename, $fs_Util, $regex_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const dirpath = String.raw({ raw: ["", "/wingdir-inflight"] }, tmpdir);
      (await $fs_Util.mkdir(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(dirpath)),true)))};
      try {
        (await $fs_Util.mkdir(dirpath));
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^EEXIST: file already exists\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $regex_Util.match("^EEXIST: file already exists", e)),true)))};
      }
      (await $fs_Util.writeFile((await $fs_Util.join(dirpath, $filename)), ""));
      const files = (await $fs_Util.readdir(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: files.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(files.length,1)))};
      (await $fs_Util.remove(dirpath, ({"recursive": true})));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(dirpath)),false)))};
      const nilFiles = (await $fs_Util.tryReaddir(dirpath));
      {((cond) => {if (!cond) throw new Error("assertion failed: nilFiles == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(nilFiles,undefined)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.js.map
```

=======
>>>>>>> 5f6a31d348b198f70983d0eef65719ddc0604ef5
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

<<<<<<< HEAD
## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
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
          require("./inflight.$Closure1-1.js")({
            $filename: ${context._lift(filename)},
            $fs_Util: ${context._lift($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(filename, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const tmpdir = (fs.Util.mkdtemp());
    const dirpath = String.raw({ raw: ["", "/wingdir-preflight"] }, tmpdir);
    const filename = "temp.txt";
    (fs.Util.mkdir(dirpath));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(dirpath)),true)))};
    try {
      (fs.Util.mkdir(dirpath));
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^EEXIST: file already exists\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((regex.Util.match("^EEXIST: file already exists", e)),true)))};
    }
    (fs.Util.writeFile((fs.Util.join(dirpath, filename)), ""));
    const files = (fs.Util.readdir(dirpath));
    {((cond) => {if (!cond) throw new Error("assertion failed: files.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(files.length,1)))};
    (fs.Util.remove(dirpath, ({"recursive": true})));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(dirpath)),false)))};
    const nilFiles = (fs.Util.tryReaddir(dirpath));
    {((cond) => {if (!cond) throw new Error("assertion failed: nilFiles == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(nilFiles,undefined)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight create normal directory", new $Closure1(this, "$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "directory.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```

=======
>>>>>>> 5f6a31d348b198f70983d0eef65719ddc0604ef5
