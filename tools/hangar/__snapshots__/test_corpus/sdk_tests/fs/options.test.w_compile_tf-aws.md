# [options.test.w](../../../../../../examples/tests/sdk_tests/fs/options.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $fs_Util, $regex_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const nonExistentFilePath = String.raw({ raw: ["", "/non-existent.txt"] }, tmpdir);
      let errorCaught = false;
      try {
        (await $fs_Util.remove(nonExistentFilePath, ({"force": false})));
      }
      catch ($error_e) {
        const e = $error_e.message;
        errorCaught = (await $regex_Util.match("^ENOENT: no such file or directory", e));
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: errorCaught == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(errorCaught,true)))};
      (await $fs_Util.remove(tmpdir));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(tmpdir)),false)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $fs_Util, $regex_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const dirpath = String.raw({ raw: ["", "/testdir"] }, tmpdir);
      const filename = "sample.txt";
      let errorCaught = false;
      (await $fs_Util.mkdir(dirpath));
      (await $fs_Util.writeFile((await $fs_Util.join(dirpath, filename)), "sample content"));
      try {
        (await $fs_Util.remove(dirpath, ({"recursive": false})));
      }
      catch ($error_e) {
        const e = $error_e.message;
        errorCaught = (await $regex_Util.match("^Path is a directory: rm returned EISDIR", e));
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: errorCaught == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(errorCaught,true)))};
      (await $fs_Util.remove(dirpath));
      (await $fs_Util.remove(tmpdir));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(dirpath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(dirpath)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(tmpdir)),false)))};
    }
  }
  return $Closure2;
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
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.cjs")({
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
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.cjs")({
            $fs_Util: ${context._lift($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
            $regex_Util: ${context._lift($stdlib.core.toLiftableModuleType(regex.Util, "@winglang/sdk/regex", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:removing non-existent file with `force: false` raises error", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:removing directory with `recursive: false` raises error", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "options.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

